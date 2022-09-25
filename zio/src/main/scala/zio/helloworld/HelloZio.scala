package zio.helloworld

import zio._

object HelloZio extends ZIOAppDefault {

  def run = Console.printLine("Hello Zio")

}
