package main
import "fmt"
var g_groceries[] string

func add_grocery(a ...string) {
  fmt.Println("Capacity", cap(g_groceries))
  for _,d:=range a {
    g_groceries=append(g_groceries, d)
  }
}

func list_groceries() {
  fmt.Println("Grocery list is as follow:")
  // for i := 0; i < len(g_groceries); i++ {
  //   fmt.Println(g_groceries[i])
  // }

  // Range loop
  // for index, data:=range slice {
  //
  // }
  // for _, data:range slice {
  //
  // }
  for _,data:=range g_groceries {
    fmt.Println(data)
  }
}

func main() {
  add_grocery("Bread")
  add_grocery("Cucumbers")
  add_grocery("Salt and Vinegar Potateo Chips")
  add_grocery("Fruit Cake")
  add_grocery("Pokemon Game")
  add_grocery("Ice Cream")
  add_grocery("Holiday Ice Cream", "Corn", "Peas")
  list_groceries()
}
