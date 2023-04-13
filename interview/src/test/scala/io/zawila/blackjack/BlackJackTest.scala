package io.zawila.blackjack

import io.zawila.blackjack.BlackJack._
import org.scalatest.GivenWhenThen
import org.scalatest.featurespec.AnyFeatureSpec
import org.scalatest.matchers.should.Matchers

class BlackJackTest extends AnyFeatureSpec with Matchers with GivenWhenThen {

  Feature("Black jack") {

    Scenario("First test") {
      calculateValue(List(TwoCard)) shouldBe 2
      calculateValue(List(Ace, Ace)) shouldBe 12
      calculateValue(List(Ace, Ace, TenCard)) shouldBe 12
    }

    Scenario("All aces") {
      calculateValue(List(Ace, Ace, Ace)) shouldBe 13
    }

    Scenario("Second test") {
      calculateValue(List(TenCard, Ace, Ace)) shouldBe 12
    }

    Scenario("Third test") {
      calculateValue(List(NineCard, TenCard, NineCard)) shouldBe 28
    }

  }

}
