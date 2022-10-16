package coupling.example

import scala.concurrent.Future

import akka.http.scaladsl.server.Directives._
import coupling.example.model.{NewOrder, NewOrderApi}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
import io.circe.generic.auto._

object BetterRoute {
  def route =
    post {
      path("better-create-order") {
        entity(as[NewOrderApi]) { o =>
          val order = NewOrder.from(o)
          val processedOrder = Future.successful {
            order.copy(name = order.name.toUpperCase, amount = order.amount - 1)
          }
          onSuccess(processedOrder) { o =>
            complete(o)
          }
        }
      }
    }
}
