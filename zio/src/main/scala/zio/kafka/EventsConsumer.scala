package zio.kafka

import zio.ZLayer
import zio.kafka.consumer.{Consumer, ConsumerSettings, Subscription}
import zio.Console._
import zio.kafka.serde._

case class EventsConsumer() {
  val consume = Consumer.consumeWith(
    settings = ConsumerSettings(List("localhost:29092"))
      .withGroupId("MyGroup"),
    subscription = Subscription.topics("test"),
    keyDeserializer = Serde.string,
    valueDeserializer = Serde.string
  )((k,v) ⇒
    printLine(s"Received value: $v with key: $k").orDie
  )

  def run = for {
    _ ← printLine("Starting consumer...")
    _ ← consume
  } yield ()

}

object EventsConsumer {
  val layer = ZLayer.fromFunction(EventsConsumer.apply _)
}
