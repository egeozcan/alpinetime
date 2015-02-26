package main

import (
	"alpinetime/server"
)

func main() {
	r := server.Create()
	r.Run(":8080")
}
