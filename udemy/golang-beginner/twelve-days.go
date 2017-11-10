package main
import "fmt"

func main() {
  fmt.Println("On the day 1 of Christmas my true love sent to me:")
  fmt.Println("a Partridge in a Pear Tree")
  fmt.Println("")

  for day:=2; day <= 12; day++ {
    fmt.Println("On the day", day, "of Christmas my true love sent to me:")

    switch day {
    case 12:
      fmt.Println("Twelve Drummers Drumming")
      fallthrough
    case 11:
      fmt.Println("Eleven Pipers Piping")
      fallthrough
    case 10:
      fmt.Println("Ten Lords a Leaping")
      fallthrough
    case 9:
      fmt.Println("Nine Ladies Dancing")
      fallthrough
    case 8:
      fmt.Println("Eight Maids a Milking")
      fallthrough
    case 7:
      fmt.Println("Seven Swans a Swimming")
      fallthrough
    case 6:
      fmt.Println("Six Geese a Laying")
      fallthrough
    case 5:
      fmt.Println("Five Golden Rings")
      fallthrough
    case 4:
      fmt.Println("Four Calling Birds")
      fallthrough
    case 3:
      fmt.Println("Three French Hens")
      fallthrough
    case 2:
      fmt.Println("Two Turtle Doves")
      fallthrough
    case 1:
      fmt.Println("and a Partridge in a Pear Tree")
      // Final case cannot use fallthrough
    }

    fmt.Println("")
  }
}
