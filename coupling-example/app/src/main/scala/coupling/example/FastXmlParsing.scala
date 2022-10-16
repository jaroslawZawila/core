package coupling.example

import scala.reflect.ClassTag

import akka.http.scaladsl.marshalling.{Marshaller, ToEntityMarshaller}
import akka.http.scaladsl.model.{ContentTypes, HttpEntity, MessageEntity}
import akka.http.scaladsl.unmarshalling.{FromEntityUnmarshaller, Unmarshaller}
import akka.util.ByteString
import com.fasterxml.jackson.databind.ObjectMapper

trait FastXmlParsing {
  lazy val jsonReaderMapper: ObjectMapper = new ObjectMapper();

  private val jsonStringUnmarshaller =
    Unmarshaller.byteStringUnmarshaller
      .mapWithCharset {
        case (ByteString.empty, _) ⇒ throw Unmarshaller.NoContentException
        case (data, charset) ⇒ data.decodeString(charset.nioCharset.name)
      }

  implicit protected def unmarshaller[A](
    implicit ct: ClassTag[A]
  ): FromEntityUnmarshaller[A] =
    jsonStringUnmarshaller map { data ⇒
      jsonReaderMapper.readValue(data, ct.runtimeClass).asInstanceOf[A]
    }

  implicit protected val JsonMarshaller: ToEntityMarshaller[Any] =
    Marshaller.opaque[Any, MessageEntity] { m ⇒
      HttpEntity.Strict(
        ContentTypes.`application/json`,
        ByteString(jsonReaderMapper.writeValueAsBytes(m))
      )
    }
}
