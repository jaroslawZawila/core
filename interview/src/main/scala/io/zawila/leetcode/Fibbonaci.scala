package io.zawila.leetcode

object Fibbonaci extends App {
  import SolutionFib.fib

  println(fib(0))
  println(fib(1))
  println(fib(2))
  println(fib(3))
  println(fib(4))
  println(fib(5))

}

object SolutionFib {
  def fib(n: Int): Int = {
    if (n <= 1)
      n
    else
      fib(n - 1) + fib(n - 2)
  }
}
