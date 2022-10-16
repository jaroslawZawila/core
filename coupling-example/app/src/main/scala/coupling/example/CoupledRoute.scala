package coupling.example

import scala.concurrent.Future

import akka.http.scaladsl.server.Directives._
import couple.example.Order

object CoupledRoute extends FastXmlParsing {

  def route =
    post {
      path("create-order") {
        entity(as[Order]) { order =>
          val processedOrder: Future[Order] = Future.successful {
            order.setName(order.getName.toUpperCase())
            order.setAmount(order.getAmount - 1)
            if (!order.toString.contains("identifier"))
              throw new Exception("Boom")
            order
          }
          onSuccess(processedOrder) { o =>
            complete(o)
          }
        }
      }
    }
}
