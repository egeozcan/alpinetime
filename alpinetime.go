package main

import (
	"alpinetime/server"
	"fmt"
)

func main() {
	r := server.Create()
	fmt.Println("-- Started --")
	r.Run(":8081")
}
