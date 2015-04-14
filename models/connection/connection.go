package connection

import (
	"alpinetime/models"
	_ "database/sql"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
	"os"
)

var Db *gorm.DB
var LastError error

func init() {
	if Db != nil {
		return
	}
	var err error
	var db gorm.DB
	if conStr := os.Getenv("ALPCONN"); conStr != "" {
		db, err = gorm.Open("postgres", conStr)
	} else {
		db, err = gorm.Open("sqlite3", "./alpinetime.sqlite")
	}
	if err != nil {
		LastError = err
		return
	}
	Db = &db
	migrate()
}

func ResetDB() {
	Db.Exec(`
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS estimations;
    DROP TABLE IF EXISTS packages;
    DROP TABLE IF EXISTS projects;
    DROP TABLE IF EXISTS tasks;
    DROP TABLE IF EXISTS user_projects;
    DROP TABLE IF EXISTS users;`)
	migrate()
}

func migrate() {
	Db.AutoMigrate(
		&models.User{},
		&models.Project{},
		&models.Lookup{},
		&models.Package{},
		&models.Comment{},
		&models.Task{},
		&models.Estimation{},
		&models.Customer{},
		&models.Step{},
		&models.History{})
}
