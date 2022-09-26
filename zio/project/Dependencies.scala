import sbt._

object Dependencies {

  lazy val core = Seq(
    "dev.zio" %% "zio" % "2.0.2",
    "dev.zio" %% "zio-json" % "0.3.0-RC11",
    "io.d11" %% "zhttp" % "2.0.0-RC10",
    "io.getquill" %% "quill-zio" % "4.3.0",
    "io.getquill" %% "quill-jdbc-zio" % "4.3.0",
    "com.h2database" % "h2" % "2.1.214"
  )

  lazy val scalaTest = Seq(
    "org.scalatest" %% "scalatest" % "3.2.11"
  ).map(_ % Test)
}
