package zio.rest

import zhttp.http._
import Metrics._

object GreetingApp {
  def apply(): Http[Any, Nothing, Request, Response] = Http.collect[Request] {
    case (req @ Method.GET -> !! / "greet") if req.url.queryParams.nonEmpty =>
      Response.text(
        s"Hello ${req.url.queryParams("name").mkString(",")}"
      )

    case req @ Method.GET -> !! / "greet" => Response.text("Hello world")

    case req @ Method.GET -> !! / "greet" / name =>
      Response.text(s"Hello $name")
  }
}
