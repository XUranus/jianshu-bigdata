package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json.{ JsNull, Json, JsString, JsValue }
/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  /**
   * Create an Action to render an HTML page with a welcome message.
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  case class User(name: String, age: Int)

  implicit val userFormat = Json.format[User]

  def handleSubmit(uhash:String) = Action {
    //爬数据
    val crawler = new Crawler(uhash)
    crawler.crawl() match {
      case Some((user,newDynamics)) => {
        //存储
        DataProcess.appendUser(user)
        DataProcess.appendDynamics(newDynamics)
        DataProcess.loadDatabase(user.uhash)
        //提取数据
        val dynamics = DataProcess.getDynamics(user.uhash) //TODO::这一句没用，而且还吃性能
        dynamics.show()//TODO::这一句也是
        //开始分析
        val resJson = Json.obj(
          "succ" -> true,
          "data" -> StatisticAnalysis.process(user)
        )
        //返回结果
        println(resJson)
        Ok(resJson)
      }
      case None => {
        val resJson = Json.obj("succ" -> false,"msg"->"用户不存在！")
        println(resJson)
        Ok(resJson)
      }
    }
  }

}
