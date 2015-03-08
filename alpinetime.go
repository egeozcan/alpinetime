package main

import (
	"alpinetime/server"
	//"alpinetime/models"
	"fmt"
	//"github.com/jinzhu/gorm"
)

func main() {
	r := server.Create()
	fmt.Println("-- Started --")
	r.Run(":8081")
}
