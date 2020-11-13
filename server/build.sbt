
name := "jianshu_server"
 
version := "1.0" 
      
lazy val `jianshu_server` = (project in file(".")).enablePlugins(PlayScala)

resolvers += "aliyun" at "http://maven.aliyun.com/nexus/content/groups/public/"

resolvers += "Artima Maven Repository" at "http://repo.artima.com/releases"

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
resolvers += "Akka Snapshot Repository" at "http://repo.akka.io/snapshots/"
      
scalaVersion := "2.12.2"

libraryDependencies ++= Seq( jdbc , ehcache , ws , specs2 % Test , guice )

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

libraryDependencies += "mysql" % "mysql-connector-java" % "8.0.15"

libraryDependencies += "org.jsoup" % "jsoup" % "1.7.3"

libraryDependencies += "org.ansj" % "ansj_seg" % "5.1.6"

libraryDependencies += "org.apache.spark" %% "spark-sql" % "2.4.1"

//libraryDependencies += filters

libraryDependencies += guice

// https://mvnrepository.com/artifact/com.typesafe.play/play-json
libraryDependencies += "com.typesafe.play" %% "play-json" % "2.7.3"

// https://mvnrepository.com/artifact/com.fasterxml.jackson.module/jackson-module-scala
libraryDependencies += "com.fasterxml.jackson.module" %% "jackson-module-scala" % "2.9.8"