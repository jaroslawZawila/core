package zio.rest

import zhttp.service.Server
import zio.{Ref, Scope, ZIO, ZIOAppArgs, ZIOAppDefault, ZLayer, durationInt}
import zio.metrics.connectors.{MetricsConfig, prometheus}

object Main extends ZIOAppDefault {
  private val metricsConfig = ZLayer.succeed(MetricsConfig(1.seconds))
  def run: ZIO[Environment with ZIOAppArgs with Scope, Any, Any] = Server
    .start(
      port = 8080,
      http =
        GreetingApp() ++ DownloadApp() ++ CounterApp() ++ PrometheusPublisherApp() // ++ UserApp()
    )
    .provide(
      ZLayer.fromZIO(Ref.make(0)),
      metricsConfig,
      prometheus.publisherLayer,
      prometheus.prometheusLayer
//      PersistentUserRepo.layer
    )
}
