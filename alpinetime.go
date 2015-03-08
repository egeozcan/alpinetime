package main

import (
	"alpinetime/server"
	"fmt"
	//"alpinetime/models"
	//"github.com/jinzhu/gorm"
)

func main() {
	r := server.Create()
	fmt.Println("-- Started --")
	r.Run(":8081")
}
