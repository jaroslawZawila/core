package zio.rest

import zhttp.http._
import zio._
import zio.json._

object UserApp {
  def apply(): Http[UserRepo, Throwable, Request, Response] =
    Http.collectZIO[Request] {
      // POST /users -d '{"name": "John", "age": 35}'
      case req @ (Method.POST -> !! / "users") =>
        for {
          u ← req.bodyAsString.map(_.fromJson[User](User.jsonDecoder))
          r ← u match {
            case Left(e) ⇒
              ZIO
                .debug(s"Failed to parse the input: $e")
                .as(
                  Response.text(e).setStatus(Status.BadRequest)
                )
            case Right(u) ⇒
              UserRepo
                .register(u)
                .map(id => Response.text(id))
          }
        } yield r

      case Method.GET -> !! / "users" / id =>
        UserRepo.lookup(id).map {
          case Some(value) ⇒ Response.json(value.toJson(User.jsonEncoder))
          case None ⇒ Response.status(Status.NotFound)
        }

      case Method.GET -> !! / "users" ⇒
        UserRepo.users.map(response ⇒ Response.json(response.toJson))
    }
}
