package coupling.example.model

import scala.util.Random

import io.scalaland.chimney.dsl._

case class NewOrder(id: String, name: String, amount: Int, createdAt: Long)

object NewOrder {
  def from(o: NewOrderApi) =
    o.into[NewOrder]
      .withFieldComputed(_.createdAt, _ ⇒ Random.nextLong())
      .withFieldRenamed(_.identifier, _.id)
      .transform
}
