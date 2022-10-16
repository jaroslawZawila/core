package coupling.example

import scala.concurrent.Future

import akka.http.scaladsl.server.Directives._

object BetterRoute {
  def route =
    post {
      path("create-order") {
        entity(as[String]) { order =>
          val processedOrder = Future.successful {
//            order.copy(name = order.name.toUpperCase, amount = order.amount - 1)
            ""
          }
          onSuccess(processedOrder) { o =>
            complete("")
          }
        }
      }
    }
}
