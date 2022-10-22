import Dependencies._

ThisBuild / scalaVersion := "2.13.8"
ThisBuild / version := "0.1.0-SNAPSHOT"
ThisBuild / organization := "com.example"
ThisBuild / organizationName := "example"

lazy val root = (project in file("."))
  .settings(
    name := "core",
    libraryDependencies ++=
      core ++ scalaTest
  )
mainClass in reStart := Some("zio.kafka.Main")
