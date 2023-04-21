package io.zawila.leetcode

object Steps extends App {

  println(climbStairs(1))
  println(climbStairs(2))
  println(climbStairs(3)) // 3
  println(climbStairs(4)) // 5
  println(climbStairs(5)) // 8
  println(climbStairs(6)) // 8

  def climbStairs(n: Int): Int = {
    if (n <= 0) {
      0
    } else if (n < 4) {
      n
    } else {
      climbStairs(n - 1) + climbStairs(n - 2)
    }
  }

}
