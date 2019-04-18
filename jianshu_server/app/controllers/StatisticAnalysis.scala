package controllers

import StatisticAnalysis.spark
import org.ansj.recognition.impl.StopRecognition
import org.ansj.splitWord.analysis.ToAnalysis
import org.apache.spark.{SparkConf, SparkContext}
import play.api.libs.json.{JsNull, JsString, JsValue, Json}
import org.apache.spark.sql.{Dataset, Row}

import scala.io.Source

object StatisticAnalysis {

  val spark = DataProcess.spark
  val filter = new StopRecognition()
  filter.insertStopNatures("w")//去除标点
  val file = Source.fromFile ("/home/xuranus/stopwords.dat")
  for(x<- file.getLines()){
    filter.insertStopWords(x.toString())
  }
  filter.insertStopWords("")
  filter.insertStopWords("\n")

  private def loadTempViews() = {
    spark.sql("select * from global_temp.user_dynamics_info where dynamic_type = 'follow_user'").createOrReplaceGlobalTempView("follow_user_dynamics")
    spark.sql("select * from global_temp.user_dynamics_info where dynamic_type = 'follow_topics'").createOrReplaceGlobalTempView("follow_topics_dynamics")
    spark.sql("select * from global_temp.user_dynamics_info where dynamic_type = 'like_article'").createOrReplaceGlobalTempView("like_article_dynamics")
    spark.sql("select * from global_temp.user_dynamics_info where dynamic_type = 'like_comment'").createOrReplaceGlobalTempView("like_comment_dynamics")
    spark.sql("select * from global_temp.user_dynamics_info where dynamic_type = 'follow_work_collects'").createOrReplaceGlobalTempView("follow_work_collects_dynamics")
    spark.sql("select * from global_temp.user_dynamics_info where dynamic_type = 'make_comment'").createOrReplaceGlobalTempView("make_comment_dynamics")
    spark.sql("select * from global_temp.user_dynamics_info where dynamic_type = 'publish_article'").createOrReplaceGlobalTempView("publish_article_dynamics")
    spark.sql("select * from global_temp.user_dynamics_info where dynamic_type = 'reward_author'").createOrReplaceGlobalTempView("reward_author_dynamics")
  }

  def process(user: User):JsValue = {
    loadTempViews()
    Json.obj(
      "summary" -> processSummary(user),
      "first_time" -> processFirstTime(),
      "dynamic_type_statistic" -> processDynamicTypeStatistic(),
      "monthly_dynamic_counts_statistic" -> processMonthlyDynamicCountsStatistic(),
      "daily_dynamic_counts_statistic" -> processDailyDynamicCountsStatistic(),
      "daily_dynamic_statisic" -> processDailyDynamicStatisic(),
      "weekly_dynamic_statistic" -> processWeeklyDynamicStatistic(),
      "week_articles_publish_frequency" -> processWeekArticlesPublishFrequency(),
      "word_cloud" -> processWordCloud()
    )
  }


  private def processSummary(user: User):JsValue = {
    Json.obj(
      "username" -> user.nickname,
      "avatar" -> user.avatar,
      "cur_time" -> Util.UTCString2CommonTimeString(user.update_time),
      "user_followd_num" -> user.following_num,
      "be_followed_num" -> user.followers_num,
      "articles_num" -> user.articles_num,
      "articles_words_num" -> user.words_num,
      "articles_be_liked_times" -> user.be_liked_num,
      "liked_articles_times" -> spark.sql("select count(*) from global_temp.like_article_dynamics where dynamic_type = 'like_article'").first().getLong(0),
      "topics_followed_num" -> spark.sql("select count(*) from global_temp.follow_topics_dynamics where dynamic_type = 'follow_topics'").first().getLong(0),
      "work_collects_followed_num" -> spark.sql("select count(*) from global_temp.follow_work_collects_dynamics where dynamic_type = 'follow_work_collects'").first().getLong(0),
      "comment_times" -> spark.sql("select count(*) from global_temp.make_comment_dynamics where dynamic_type = 'make_comment'").first().getLong(0),
      "like_comment_times" -> spark.sql("select count(*) from global_temp.like_comment_dynamics where dynamic_type = 'like_comment'").first().getLong(0),
      "reward_authors_times" -> spark.sql("select count(*) from global_temp.reward_author_dynamics where dynamic_type = 'reward_author'").first().getLong(0)
    )
  }

  private def processFirstTime():JsValue = {
    val joinJianshuDF = spark.sql("select time from global_temp.user_dynamics_info where dynamic_type = 'join_jianshu'").toDF()
    val joinJianshuTime = if(joinJianshuDF.count()>0){joinJianshuDF.first().getString(0)} else ""

    //TODO:注意极端情况下容错
    val followUserDF = spark.sql("select time,hash from global_temp.follow_user_dynamics order by id asc")

    val firstFollowUserJson = if(followUserDF.count()>0) {
      Json.obj(
        "time" -> Util.UTCString2CommonTimeString(followUserDF.first().getString(0)),
        "href" -> ("https://www.jianshu.com/u/"+followUserDF.first().getString(1))
      )}else{
      Json.obj(
        "time" -> "",
        "href" -> ""
      )
    }

    val publishArticleDF = spark.sql("select time,hash from global_temp.publish_article_dynamics order by id asc")
    val publishArticleJson = if(publishArticleDF.count()>0) {
      Json.obj(
        "time" -> Util.UTCString2CommonTimeString(publishArticleDF.first().getString(0)),
        "href" -> ("https://www.jianshu.com/p/"+publishArticleDF.first().getString(1))
      )}else{
      Json.obj(
        "time" -> "",
        "href" -> ""
      )
    }

    val likeArticleDF = spark.sql("select time,hash from global_temp.like_article_dynamics order by id asc")
    val likeArticleJson = if(likeArticleDF.count()>0) {
      Json.obj(
        "time" -> Util.UTCString2CommonTimeString(likeArticleDF.first().getString(0)),
        "href" -> ("https://www.jianshu.com/p/"+likeArticleDF.first().getString(1))
      )}else{
      Json.obj(
        "time" -> "",
        "href" -> ""
      )
    }

    val followTopicDF = spark.sql("select time,hash from global_temp.follow_topics_dynamics order by id asc")
    val followTopicJson = if(followTopicDF.count()>0) {
      Json.obj(
        "time" -> Util.UTCString2CommonTimeString(followTopicDF.first().getString(0)),
        "href" -> ("https://www.jianshu.com/c/"+followTopicDF.first().getString(1))
      )}else{
      Json.obj(
        "time" -> "",
        "href" -> ""
      )
    }

    val followWorkCollectsDF = spark.sql("select time,hash from global_temp.follow_work_collects_dynamics order by id asc")
    val followWorkCollectsJson = if(followWorkCollectsDF.count()>0) {
      Json.obj(
        "time" -> Util.UTCString2CommonTimeString(followWorkCollectsDF.first().getString(0)),
        "href" -> ("https://www.jianshu.com/nb/"+followWorkCollectsDF.first().getString(1))
      )}else{
      Json.obj(
        "time" -> "",
        "href" -> ""
      )
    }

    val makeCommentDF = spark.sql("select time,hash,content from global_temp.make_comment_dynamics order by id asc")
    val makeCommentJson = if(makeCommentDF.count()>0) {
      Json.obj(
        "time" -> Util.UTCString2CommonTimeString(makeCommentDF.first().getString(0)),
        "href" -> ("https://www.jianshu.com/p/"+makeCommentDF.first().getString(1)),
        "content" -> makeCommentDF.first().getString(2)
      )}else{
      Json.obj(
        "time" -> "",
        "href" -> "",
        "content" -> ""
      )
    }

    val likeCommentDF = spark.sql("select time,hash,content from global_temp.like_comment_dynamics order by id asc")
    val likeCommentJson = if(likeCommentDF.count()>0) {
      Json.obj(
        "time" -> Util.UTCString2CommonTimeString(likeCommentDF.first().getString(0)),
        "href" -> ("https://www.jianshu.com/p/"+likeCommentDF.first().getString(1)),
        "content" -> likeCommentDF.first().getString(2)
      )}else{
      Json.obj(
        "time" -> "",
        "href" -> "",
        "content" -> ""
      )
    }

    val rewardAuthorDF = spark.sql("select time,hash,title from global_temp.reward_author_dynamics order by id asc")
    val rewardAuthorJson = if(rewardAuthorDF.count()>0) {
      Json.obj(
        "time" -> Util.UTCString2CommonTimeString(rewardAuthorDF.first().getString(0)),
        "href" -> ("https://www.jianshu.com/u/"+rewardAuthorDF.first().getString(1)),
        "title" -> rewardAuthorDF.first().getString(2)
      )}else{
      Json.obj(
        "time" -> "",
        "href" -> "",
        "title" -> ""
      )
    }

    //TODO:注意极端情况下容错
    Json.obj(
      "register" -> Json.obj("time" -> Util.UTCString2CommonTimeString(joinJianshuTime)),
      "follow_user" -> firstFollowUserJson,
      "publish_article" -> publishArticleJson,
      "like_article" -> likeArticleJson,
      "follow_topic" -> followTopicJson,
      "follow_work_collects" -> followWorkCollectsJson,
      "make_comment" -> makeCommentJson,
      "like_comment" -> likeCommentJson,
      "reward_author" -> rewardAuthorJson,
    )
  }

  private def processDynamicTypeStatistic():JsValue = {
    Json.obj(
      "data" -> Json.arr(
        Json.obj("name" -> "发表文章", "value" -> spark.sql("select count(*) from global_temp.publish_article_dynamics").first().getLong(0)),
        Json.obj("name" -> "关注文集", "value" -> spark.sql("select count(*) from global_temp.follow_work_collects_dynamics").first().getLong(0)),
        Json.obj("name" -> "赞赏文章", "value" -> spark.sql("select count(*) from global_temp.reward_author_dynamics").first().getLong(0)),
        Json.obj("name" -> "发表评论", "value" -> spark.sql("select count(*) from global_temp.make_comment_dynamics").first().getLong(0)),
        Json.obj("name" -> "点赞评论", "value" -> spark.sql("select count(*) from global_temp.like_comment_dynamics").first().getLong(0)),
        Json.obj("name" -> "关注用户", "value" -> spark.sql("select count(*) from global_temp.follow_user_dynamics").first().getLong(0)),
        Json.obj("name" -> "喜欢文章", "value" -> spark.sql("select count(*) from global_temp.like_article_dynamics").first().getLong(0)),
        Json.obj("name" -> "关注专题", "value" -> spark.sql("select count(*) from global_temp.follow_topics_dynamics").first().getLong(0)),
      ),
    )
  }

  private def processMonthlyDynamicCountsStatistic():JsValue = {
    val monthlyStatisticDF = spark.sql("select count(*) as num,substring(time,1,7) as month from global_temp.user_dynamics_info group by month order by month asc")
    val yAxisData:Array[Long] = monthlyStatisticDF.select("num").rdd.map(r=>r.getLong(0)).collect()
    val xAxisData:Array[String] = monthlyStatisticDF.select("month").rdd.map(r=>r.getString(0)).collect()
    Json.obj(
      "xAxisData"->xAxisData,
      "yAxisData"->yAxisData
    )
  }

  private def processDailyDynamicCountsStatistic():JsValue = {
    val monthlyStatisticDF = spark.sql("select count(*) as num,substring(time,1,10) as day from global_temp.user_dynamics_info group by day order by day asc")
    val yAxisData:Array[Long] = monthlyStatisticDF.select("num").rdd.map(r=>r.getLong(0)).collect()
    val xAxisData:Array[String] = monthlyStatisticDF.select("day").rdd.map(r=>r.getString(0)).collect()
    Json.obj(
      "xAxisData"->xAxisData,
      "yAxisData"->yAxisData
    )
  }

  private def processDailyDynamicStatisic():JsValue = {
    val dailyStatisticDF = spark.sql("select count(*) as num,substring(time,12,2) as hour from global_temp.user_dynamics_info group by hour order by hour")
    val yAxisData:Array[Long] = dailyStatisticDF.select("num").rdd.map(r=>r.getLong(0)).collect()
    Json.obj(
      "data"->yAxisData,
    )
  }

  private def processWeeklyDynamicStatistic():JsValue = {
    val weeklyStatisticDF = spark.sql("select count(*) as num,weekday from global_temp.user_dynamics_info group by weekday order by weekday asc")
    val yAxisData:Array[Long] = weeklyStatisticDF.select("num").rdd.map(r=>r.getLong(0)).collect()
    Json.obj(
      "data" -> yAxisData,
    )
  }

  private def processWeekArticlesPublishFrequency():JsValue = {
    //hour weekday count
    val statisticDF = spark.sql("select count(*) as num,substring(time,12,2) as hour,weekday from global_temp.user_dynamics_info group by weekday,hour")
    val yAxisData = statisticDF.
      rdd.map(r=>Json.obj(
      "col_hour" -> r.getString(1).toInt,
      "dync_hour" -> (r.getInt(2)-1),
      "hour_times" -> r.getLong(0)
    )).collect()
    Json.obj(
      "data" -> yAxisData,
    )
  }

  private def processWordCloud():JsValue = {
    /*return Json.obj(
      "total_comments_num" -> 10,
      "data" -> Json.arr(Json.obj("name"->"","value"->0))
    )*/
    val comments = getCommentsArr()
    val splited = splitWords(comments)
    val wc = wordCount(splited)
    val choose=wc.take(50)
    //choose.foreach(println)
    val data = choose.map(x=>Json.obj("name"->x._2,"value"->x._1))
    Json.obj(
      "total_comments_num" -> spark.sql("select count(*) from global_temp.make_comment_dynamics").toDF().first().getLong(0),
      "data" -> data
    )
  }

  def getCommentsArr() = {
    val words = spark.sql("select content from global_temp.make_comment_dynamics")
      .toDF().select("content").rdd
      .map(r => r(0).asInstanceOf[String].split("\\|").map(_.toString).distinct)
      .collect().flatten
    words
  }

  def splitWords(words:Array[String]) = {
    words.map(w => ToAnalysis.parse(w).recognition(filter).toStringWithOutNature(" ").split(" "))
      .flatten
  }


  def wordCount(words: Array[String]) = {
    val wordCount = spark.newSession().sparkContext
      .parallelize(words)
      .flatMap(_.split(" "))
      .map((_, 1))
      .reduceByKey(_ + _)
      .map(x => (x._2, x._1))
      .sortByKey(ascending = false)
    wordCount
  }

}

