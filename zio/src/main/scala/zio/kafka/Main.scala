package zio.kafka

import scala.util.Random

import org.apache.kafka.clients.producer.ProducerRecord
import zio.{Clock, Schedule, ZIO, ZIOAppDefault, ZLayer}
import zio.Console._
import zio.kafka.producer._
import zio.kafka.serde._
import zio._

//object Main extends ZIOAppDefault {
//  private val producerConfig = ProducerSettings(List("localhost:29092"))
//
//  def run = ZIO.serviceWithZIO[Apps](_.myApp)
//    .provide(
//        ZLayer.scoped(Producer.make(producerConfig)),
//        Apps.layer,
//        EventsConsumer.layer
//    )
//}

case class Apps(producer: Producer, eventsConsumer: EventsConsumer) {

  def record(time: String): ProducerRecord[String, String] = new ProducerRecord(
    "test",
    Random.nextString(3),
    s"$time ${Random.nextString(15)}"
  )
  def pr(time: String) = Producer.produce[Any, String, String](
    record(time),
    Serde.string,
    Serde.string
  )

  def myApp = for {
    _ ← eventsConsumer.consume.fork
    _ ← printLine("Start kafka producer ...")
    _ ← Clock.currentDateTime
      .flatMap { time ⇒
        pr(time.toString)
      }
      .schedule(Schedule.spaced(1.second))
      .provide(ZLayer.succeed(producer))

    _ ← printLine("Finished producing to kafka...")
  } yield ()
}

object Apps {
  val layer = ZLayer.fromFunction(Apps.apply _)
}
