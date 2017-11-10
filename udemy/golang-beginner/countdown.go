package main
import "fmt"
import "time"
func main() {
  for i:=10; i > 0; i-- {
    fmt.Println(i)
    time.Sleep(time.Second)
  }

  /*
    Infinite loop:
    for {
    }
  */

  /*
    While loop:
    for <expression> {
    }
  */

  // Use break to out the loop

  fmt.Println("Happy New Year!")
}
