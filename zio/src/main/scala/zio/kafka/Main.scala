package zio.kafka

import scala.util.Random

import org.apache.kafka.clients.producer.ProducerRecord
import zio.{ZIO, ZIOAppDefault, ZLayer}
import zio.Console._
import zio.kafka.producer._
import zio.kafka.serde._

object Main extends ZIOAppDefault {
  private val producerConfig = ProducerSettings(List("localhost:29092"))

  def run = ZIO.serviceWithZIO[Apps](_.myApp)
    .provide(
        ZLayer.scoped(Producer.make(producerConfig)),
        Apps.layer
    )
}

case class Apps(producer: Producer) {

  val record: ProducerRecord[String, String] = new ProducerRecord("test", Random.nextString(3), Random.nextString(15))
  def pr = Producer.produce[Any, String, String](record, Serde.string, Serde.string)

  def myApp = for {
    _ ← printLine("Start kafka producer ...")
    _ ← pr
    _ ← printLine("Finished producing to kafka...")
  } yield ()
}

object Apps {
  val layer = ZLayer.fromFunction(Apps.apply _)
}
