package zio.rest

import zio.json._

case class User(name: String, age: Int)

object User {
  implicit val jsonEncoder = DeriveJsonEncoder.gen[User]
//  implicit val jsonListEncoder = DeriveJsonEncoder.gen[List[User]]
  implicit val jsonDecoder = DeriveJsonDecoder.gen[User]
}
