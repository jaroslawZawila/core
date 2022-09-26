package zio.rest

import zhttp.http._
import zio._
import zio.stream.ZStream

object DownloadApp {
  def apply(): Http[Any, Throwable, Request, Response] =
    Http.collectHttp[Request] {
      case Method.GET -> !! / "download" =>
        val filename = "file.txt"
        Http
          .fromStream(ZStream.fromResource(filename))
          .setHeaders(
            Headers(
              ("Content-type", "application/octet-stream"),
              ("Content-Disposition", s"attachment; filename=${filename}")
            )
          )
      case Method.GET -> !! / "download" / "stream" =>
        val file = "bigfile.txt"
        Http
          .fromStream(
            ZStream
              .fromResource(file)
              .schedule(Schedule.spaced(50.millis))
          )
          .setHeaders(
            Headers(
              ("Content-Type", "application/octet-stream"),
              ("Content-Disposition", s"attachment; filename=${file}")
            )
          )
    }
}
