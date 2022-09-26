package zio.rest

import zhttp._

object GreatingApp {
  def apply(): Http[Any, Nothing, Request, Response]
}
