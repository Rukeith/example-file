package main
import "fmt"

func main()  {
  age:=12
  if age < 13 {
    fmt.Println("Now you're young!")
  }
  if age > 12 && age < 20 {
    fmt.Println("You're a teenager")
  }
  if age > 19 && age < 30 {
    fmt.Println("You're in your twenties")
  }
  if age > 29 && age < 40 {
    fmt.Println("You're in your thirties")
  }
  if age > 39 && age < 50 {
    fmt.Println("You're getting there!")
  }
  if age > 49 {
    fmt.Println("Over the hill!")
  }

  // if age < 13 {
  //   fmt.Println("Now you're young!")
  // } else if age < 20 {
  //   fmt.Println("You're a teenager")
  // } else if age < 30 {
  //   fmt.Println("You're in your twenties")
  // } else if age < 40 {
  //   fmt.Println("You're in your thirties")
  // } else if age < 50 {
  //   fmt.Println("You're getting there!")
  // } else {
  //   fmt.Println("Over the hill!")
  // }
}
