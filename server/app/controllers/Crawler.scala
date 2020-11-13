package controllers

import java.text.SimpleDateFormat
import java.util.Date

import org.jsoup.Jsoup

import scala.collection.mutable.ArrayBuffer

class Crawler(val uhash:String) {

  var dynamicArray:ArrayBuffer[Dynamic] = new ArrayBuffer[Dynamic]()
  val curTime = new Date()
  val lastTime = DataProcess.getLastUpdateTime(uhash)

  def checkExist():Boolean = {
    var status = 404
    try {
      status = Jsoup.connect("http://www.jianshu.com/u/"+uhash)
        .header("user-agent","Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.4; en-US; rv:1.9.2.2) Gecko/20100316 Firefox/3.6.2")
        .timeout(10000)
        .response()
        .statusCode()
    } catch {
      case e:Exception => {return false}
      case _ => {return false}
    }
    status!=404
  }

  def crawl():Option[(User,Array[Dynamic])]= {
    checkExist() match {
      case true => Some((crawUser(),crawlDynamics()))
      case false => None
    }
  }

  private def crawlDynamics():Array[Dynamic] = {
    dynamicArray.clear()
    crawlDynamic(0,0)
    dynamicArray.toArray
  }

  private def crawlDynamic(maxid:Int,pageno:Int):Unit = {
    val query:String = if(maxid==0) {""} else {"?max_id=" + maxid + "&page=" + pageno}
    val url:String = "http://www.jianshu.com/users/" + uhash + "/timeline"+ query
    val document = Jsoup.connect(url)
      .header("user-agent","Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.4; en-US; rv:1.9.2.2) Gecko/20100316 Firefox/3.6.2")
      .timeout(10000)
      .get()

    val elements = document.select(".note-list li")
    if(elements.last()==null) {
      println("pageno:"+pageno)
      return
    }
    val id = elements.last().id()
    val nextMaxId = id.split("-")(1).toInt - 1

    for(i <- 0 until  elements.size()) {
      val element = elements.get(i)

      //喜欢评论
      var temp = element.select("span[data-type=like_comment]")
      if(temp.size()>0) {
        println("喜欢了评论")
        val time = temp.attr("data-datetime")
        if(Util.UTCString2Date(time).before(lastTime)) return
        val hash = element.select("blockquote span a").attr("href").replace("/p/","")
        val content = element.select("p.comment").text().replaceAll("[\\x{10000}-\\x{10FFFF}]", "emoj")
        /*val dyn = Map(
          "type" -> "like_comment",
          "time" -> time,
          "hash" -> hash,
          "content" -> content
        )*/
        val dyn = Dynamic(uhash,"",content,time,Util.UTCStringToWeekDay(time),hash,"like_comment")
        dynamicArray += dyn
        println(dyn)
      }

      //发表评论
      temp = element.select("span[data-type=comment_note]")
      if(temp.size()>0) {
        println("发表评论")
        val time = temp.attr("data-datetime")
        if(Util.UTCString2Date(time).before(lastTime)) return
        val hash = element.select("a.title").attr("href").replace("/p/","")
        val content = element.select("p.comment").text().replaceAll("[\\x{10000}-\\x{10FFFF}]", "emoj")
        /*val dyn = Map(
          "type" -> "make_comment",
          "time" -> time,
          "hash" -> hash,
          "content" -> content
        )*/
        val dyn = Dynamic(uhash,"",content,time,Util.UTCStringToWeekDay(time),hash,"make_comment")
        dynamicArray += dyn
        println(dyn)
      }

      //喜欢文章
      temp = element.select("span[data-type=like_note]")
      if(temp.size()>0) {
        println("喜欢文章")
        val time = temp.attr("data-datetime")
        if(Util.UTCString2Date(time).before(lastTime)) return
        val hash = element.select("a.title").attr("href").replace("/p/","")
        /*val dyn = Map(
          "type" -> "like_article",
          "time" -> time,
          "hash" -> hash
        )*/
        val dyn = Dynamic(uhash,"","",time,Util.UTCStringToWeekDay(time),hash,"like_article")
        dynamicArray += dyn
        println(dyn)
      }

      //赞赏文章
      temp = element.select("span[data-type=reward_note]")
      if(temp.size()>0) {
        println("赞赏文章")
        val time = temp.attr("data-datetime")
        if(Util.UTCString2Date(time).before(lastTime)) return
        val hash = element.select("a.title").attr("href").replace("/p/","")
        val title = element.select("a.title").text()
        /*val dyn = Map(
          "type" -> "reward_author",
          "time" -> time,
          "title" -> title,
          "hash" -> hash
        )*/
        val dyn = Dynamic(uhash,title,"",time,Util.UTCStringToWeekDay(time),hash,"reward_author")
        dynamicArray += dyn
        println(dyn)
      }

      //发表文章
      temp = element.select("span[data-type=share_note]")
      if(temp.size()>0) {
        println("发表文章")
        val time = temp.attr("data-datetime")
        if(Util.UTCString2Date(time).before(lastTime)) return
        val hash = element.select("a.title").attr("href").replace("/p/","")
        /*val dyn = Map(
          "type" -> "publish_article",
          "time" -> time,
          "hash" -> hash
        )*/
        val dyn = Dynamic(uhash,"","",time,Util.UTCStringToWeekDay(time),hash,"publish_article")
        dynamicArray += dyn
        println(dyn)
      }

      //关注专题
      temp = element.select("span[data-type=like_collection]")
      if(temp.size()>0) {
        println("关注专题")
        val time = temp.attr("data-datetime")
        if(Util.UTCString2Date(time).before(lastTime)) return
        val hash = element.select("a.title").attr("href").replace("/c/","")
        /*val dyn = Map(
          "type" -> "follow_topics",
          "time" -> time,
          "hash" -> hash
        )*/
        val dyn = Dynamic(uhash,"","",time,Util.UTCStringToWeekDay(time),hash,"follow_topics")
        dynamicArray += dyn
        println(dyn)
      }

      //关注作者
      temp = element.select("span[data-type=like_user]")
      if(temp.size()>0) {
        println("关注作者")
        val time = temp.attr("data-datetime")
        if(Util.UTCString2Date(time).before(lastTime)) return
        val hash = element.select("a.title").attr("href").replace("/u/","")
        /*val dyn = Map(
          "type" -> "follow_user",
          "time" -> time,
          "hash" -> hash
        )*/
        val dyn = Dynamic(uhash,"","",time,Util.UTCStringToWeekDay(time),hash,"follow_user")
        dynamicArray += dyn
        println(dyn)
      }

      //加入简书
      temp = element.select("span[data-type=join_jianshu]")
      if(temp.size()>0) {
        println("加入简书")
        val time = temp.attr("data-datetime")
        if(Util.UTCString2Date(time).before(lastTime)) return
        /*val dyn = Map(
          "type" -> "join_jianshu",
          "time" -> time
        )*/
        val dyn = Dynamic(uhash,"","",time,Util.UTCStringToWeekDay(time),"","join_jianshu")
        dynamicArray += dyn
        println(dyn)
      }

      temp = element.select("span[data-type=like_notebook]")
      if(temp.size()>0) {
        println("关注文集")
        val time = temp.attr("data-datetime")
        if(Util.UTCString2Date(time).before(lastTime)) return
        val hash = element.select("a.title").attr("href").replace("/nb/","")
        /*val dyn = Map(
          "type" -> "like_work_collects",
          "time" -> time,
          "hash" -> hash
        )*/
        val dyn = Dynamic(uhash,"","",time,Util.UTCStringToWeekDay(time),hash,"follow_work_collects")
        dynamicArray += dyn
        println(dyn)
      }

    }
    crawlDynamic(nextMaxId,pageno+1)
  }

  private def crawUser():User = {
    //获得用户的基本信息
    val url = "https://www.jianshu.com/u/" + uhash
    val document = Jsoup.
      connect(url).
      header("user-agent","Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36").
      timeout(10000).
      get()
    //TODO::DOM随着简书维护会变化，做容错处理！！！
    //头像 昵称
    val avatar = document.select(".avatar img").attr("src")
    val username = document.select(".name").text()
    //关注 被关注 文章数 字数 收获赞
    val element = document.select(".info ul li")
    val follow:Int = element.get(0).select("p").text.toInt
    val followers:Int = element.get(1).select("p").text.toInt
    val article_num:Int = element.get(2).select("p").text.toInt
    val words_num:Int = element.get(3).select("p").text.toInt
    val articles_be_liked_times:Int = element.get(4).select("p").text.toInt
    //初始化用户对象，需要根据动态统计的先记为0
    val userMap = Map(
      "username" -> username,
      "avatar" -> avatar,
      "cur_time" -> curTime,
      "user_followd_num" -> follow,
      "be_followed_num" -> followers,
      "articles_num" -> article_num,
      "articles_words_num" -> words_num,
      "articles_be_liked_times" -> articles_be_liked_times
    )
    println(userMap)
    User(uhash,username,Util.curDate2UTCString(curTime),avatar,follow,followers,article_num,words_num,articles_be_liked_times)
  }
}
