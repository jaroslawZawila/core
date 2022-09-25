import sbt._

object Dependencies {

  lazy val core = Seq(
    "dev.zio" %% "zio" % "2.0.2"
  )

  lazy val scalaTest = Seq(
    "org.scalatest" %% "scalatest" % "3.2.11"
  ).map(_ % Test)
}
