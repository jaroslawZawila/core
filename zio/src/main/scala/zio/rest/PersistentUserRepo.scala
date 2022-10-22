package zio.rest

import java.util.UUID

import io.getquill.{Escape, H2ZioJdbcContext}
import io.getquill.jdbczio.Quill
import javax.sql.DataSource
import zio._

case class UserTable(uuid: UUID, name: String, age: Int)

case class PersistentUserRepo(ds: DataSource) extends UserRepo {
  val ctx = new H2ZioJdbcContext(Escape)

  import ctx._

  def register(user: User): Task[String] = {
    for {
      id ← Random.nextUUID
      _ ← ctx.run(
        query[UserTable].insertValue {
          lift(UserTable(id, user.name, user.age))
        }
      )
    } yield id.toString
  }.provide(ZLayer.succeed(ds))

  def lookup(id: String): Task[Option[User]] = {
    ctx.run(
      query[UserTable]
        .filter(p ⇒ p.uuid == lift(UUID.fromString(id)))
        .map(u ⇒ User(u.name, u.age))
    )
  }.provide(ZLayer.succeed(ds)).map(_.headOption)

  def users = ctx
    .run {
      quote {
        query[UserTable].map(u => User(u.name, u.age))
      }
    }
    .provide(ZLayer.succeed(ds))
}

object PersistentUserRepo {
  def layer = Quill.DataSource.fromPrefix("UserApp") >>> ZLayer.fromFunction(
    PersistentUserRepo(_)
  )
}
