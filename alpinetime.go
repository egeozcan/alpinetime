package main

import (
	"alpinetime/server"
	"alpinetime/models"
	"fmt"
	"github.com/jinzhu/gorm"
)

var Db gorm.DB

func init() {
	Db, err := models.InitDatabases(dbPath)
}

func main() {
	r := server.Create()
	fmt.Println("-- Started --")
	r.Run(":8081")
}
