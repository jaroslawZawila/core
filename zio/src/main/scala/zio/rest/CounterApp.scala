package zio.rest

import zhttp.http.{Http, Request, Response}
import zio.Ref

class Counter {
  def apply: Http[Ref[Int], Nothing, Request, Response] = ???

}
