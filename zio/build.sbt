import Dependencies._

ThisBuild / scalaVersion := "2.13.8"
ThisBuild / version := "0.1.0-SNAPSHOT"
ThisBuild / organization := "com.example"
ThisBuild / organizationName := "example"

enablePlugins(JavaAppPackaging)
enablePlugins(DockerPlugin)

lazy val root = (project in file("."))
  .settings(
    name := "zio-rest",
    libraryDependencies ++= core ++ scalaTest,
    mainClass in (Compile, run) := Some("zio.rest.Main")
  )
//mainClass in reStart := Some("zio.kafka.Main")

dockerExposedPorts := Seq(8080)
