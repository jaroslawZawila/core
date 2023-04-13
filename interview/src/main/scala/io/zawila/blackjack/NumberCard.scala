package io.zawila.blackjack

sealed trait Card {
  val value: Int
}

case object TwoCard extends Card {
  override val value: Int = 2
}
case object ThreeCard extends Card {
  override val value: Int = 3
}
case object FourCard extends Card {
  override val value: Int = 4
}
case object FiveCard extends Card {
  override val value: Int = 5
}
case object SixCard extends Card {
  override val value: Int = 6
}
case object SevenCard extends Card {
  override val value: Int = 7
}
case object EightCard extends Card {
  override val value: Int = 8
}
case object NineCard extends Card {
  override val value: Int = 9
}
case object TenCard extends Card {
  override val value: Int = 10
}
case object Jack extends Card {
  val value = 10
}
case object Queen extends Card {
  override val value: Int = 10
}
case object King extends Card {
  override val value = 10
}
case object Ace extends Card {
  override val value: Int = 11
  val lowerValue: Int = 1
}
