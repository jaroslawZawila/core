package io.zawila.blackjack

object BlackJack {

  def calculateValue(cards: List[Card]): Int = {
    val numberOfAces = cards.filter(_.isInstanceOf[Ace.type])
    val sum = cards.map(_.value).sum
    numberOfAces.foldLeft(sum) {
      case (s, _) if s > 21 => s - Ace.value + Ace.lowerValue
      case (s, _)           => s
    }

  }

}
