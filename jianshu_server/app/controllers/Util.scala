package controllers
import java.text.SimpleDateFormat
import java.util.{Calendar, Date}

object Util {

  //2019-04-16T11:00:28+08:00
  def UTCString2Date(utcStr: String) = {
    val dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
    val date = dateFormat.parse(utcStr)
    date
  }

  def UTCStringToWeekDay(utcStr:String):Int = {
    val dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
    val date = dateFormat.parse(utcStr)
    val c = Calendar.getInstance()
    c.setTime(date)
    if(c.get(Calendar.DAY_OF_WEEK)==1){
      7
    }else {
      c.get(Calendar.DAY_OF_WEEK) - 1
    }
  }

  def curDate2UTCString(date:Date) = {
    val now = new Date()
    val dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
    val cur_date = dateFormat.format(now)
    cur_date
  }

  def UTCString2CommonTimeString(utcStr:String):String = {
    try {
      val date = UTCString2Date(utcStr)
      val dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
      return dateFormat.format(date)
    } catch {
      case e:Exception => {}
    }
    ""
  }
}
