package zio.rest

import zhttp.service.Server
import zio.{Ref, Scope, ZIO, ZIOAppArgs, ZIOAppDefault, ZLayer}

object Main extends ZIOAppDefault {
  def run: ZIO[Environment with ZIOAppArgs with Scope, Any, Any] = Server
    .start(
      port = 8080,
      http = GreetingApp() ++ DownloadApp() ++ CounterApp() // ++ UserApp()
    )
    .provide(
      ZLayer.fromZIO(Ref.make(0))
//      PersistentUserRepo.layer
    )
}
