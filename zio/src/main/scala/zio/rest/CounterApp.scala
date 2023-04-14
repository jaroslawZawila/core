package zio.rest

import zhttp.http._
import zio._

object CounterApp {
  def apply(): Http[Ref[Int], Nothing, Request, Response] =
    Http.fromZIO(ZIO.service[Ref[Int]]).flatMap { ref =>
      Http.collectZIO[Request] {
        case Method.GET -> !! / "up" =>
          ref
            .updateAndGet(_ + 1)
            .map(_.toString)
            .map(Response.text) @@ Metrics.countAllRequests("get", "up")
        case Method.GET -> !! / "down" =>
          ref
            .updateAndGet(_ - 1)
            .map(_.toString)
            .map(Response.text) @@ Metrics.countAllRequests("get", "down")
        case Method.GET -> !! / "get" =>
          ref.get.map(_.toString).map(Response.text) @@ Metrics
            .countAllRequests("get", "get")
      }
    }

}
