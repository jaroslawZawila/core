package zio.rest

import zio._
import zio.metrics._

object Metrics {
  def countAllRequests(method: String, handler: String) =
    Metric
      .counterInt("count_all_requests")
      .fromConst(1)
      .tagged(
        MetricLabel("method", method),
        MetricLabel("handler", handler)
      )
}
