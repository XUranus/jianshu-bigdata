package controllers

import java.util.Properties
import org.ansj.recognition.impl.StopRecognition
import org.ansj.splitWord.analysis.ToAnalysis
import org.apache.spark.SparkContext
import org.apache.spark.sql.{Row, SQLContext, SaveMode, SparkSession}

case class User(uhash:String,nickname:String,update_time:String,
                avatar:String,following_num:Int,followers_num:Int,
                articles_num:Int,words_num:Int,be_liked_num:Int)

case class Dynamic(uhash:String,title:String,content:String,time:String,weekday:Int,hash:String,dynamic_type:String)

object DataProcess {

  System.setProperty("HADOOP_USER_NAME", "root")
  val jdbcUrl = "jdbc:mysql://localhost:3306/jianshu?useUnicode=true&characterEncoding=utf-8&useSSL=false"
  val spark: SparkSession = SparkSession
    .builder()
    .master("local[4]")//spark://masterIP:8077
    .appName("jianshu")
    .config("spark.sql.shuffle.partitions", "5")
    .config("spark.testing.memory", "512000000")
    .getOrCreate()

  def getMysqlProps():Properties = {
    val prop =new Properties()
    prop.setProperty("user","root")
    prop.setProperty("password","")
    prop
  }

  //获取上一次动态爬到的地方
  def getLastUpdateTime(uhash:String) = {
    val userDF = spark.read.jdbc(jdbcUrl,"user",getMysqlProps()).toDF()
    val userHis = userDF.filter(s"uhash ='$uhash'")
    if(userHis.count()>0) {
      val time = userHis.orderBy("id").first().getString(3)
      Util.UTCString2Date(time)
    } else {
      //远古时刻
      Util.UTCString2Date("1900-01-01T00:00:00+08:00")
    }
  }

  def appendDynamics(dynamics: Array[Dynamic]) = {
    val dynamicDF = spark.createDataFrame(dynamics).toDF()
    dynamicDF.show()
    try {
      dynamicDF.write.mode(SaveMode.Append).jdbc(jdbcUrl,"user_dynamics",getMysqlProps())
    } catch {
      case _: Exception => println("Duplicate Exception Caught")
    }
  }

  def appendUser(user:User): Unit = {
    val userDF = spark.createDataFrame(Array(user)).toDF()
    userDF.show()
    try {
      userDF.write.mode(SaveMode.Append).jdbc(jdbcUrl,"user",getMysqlProps())
    } catch {
      case _: Exception => println("Duplicate Exception Caught")
    }

  }

  def loadDatabase(uhash:String) = {
    //加载用户动态视图
    spark.read.format("jdbc").options(
      Map("url" -> "jdbc:mysql://localhost:3306/jianshu",
        "driver" -> "com.mysql.cj.jdbc.Driver",
        "dbtable" -> s"(select * from user_dynamics where uhash = '$uhash') as user_dynamics_t",
        "user" -> "root",
        "password" -> "")
    ).load().createOrReplaceGlobalTempView("user_dynamics_info")
  }

  def getDynamics(uhash:String) = {
    val dynamicsDF = spark.
      read.
      jdbc(jdbcUrl,"user_dynamics",getMysqlProps()).
      toDF().
      filter(s"uhash ='$uhash'")
    dynamicsDF
  }

}
