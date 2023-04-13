package io.zawila.blackjack

object BlackJackMain extends App {

  val black = BlackJack.calculateValue(List(Ace, Ace, TenCard))
  println(s"Your black jack score is ${black}")

}
