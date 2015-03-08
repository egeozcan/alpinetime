package models

import (
	"database/sql"
	"github.com/jinzhu/gorm"
	_ "github.com/mattn/go-sqlite3"
	"time"
)

var Db *gorm.DB
var LastError error

type Record struct {
	ID        int64
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	DeletedAt time.Time `json:"deletedAt"`
}

type User struct {
	Record
	Domain    string    `sql:"size:255"`
	Name      string    `sql:"size:255" form:"username" binding:"required"`
	Email     string    `sql:"size:254" form:"email"`
	Password  string    `sql:"-" form:"password"`
	Projects  []Project `gorm:"many2many:user_projects;"`
	LastLogin time.Time
}

type Project struct {
	Record
	Name        string `sql:"size:254" form:"Name"`
	Description string `sql:"size:254" form:"Description"`
	Manager           User
	ManagerID   sql.NullInt64 `form:"ManagerID"`
	Users             []User `gorm:"many2many:user_projects;"`
	Customer          Customer
	CustomerID  sql.NullInt64 `form:"CustomerID"`
	Packages          []Package
	Tasks             []Task
	Category          ProjectCategory
	ProjectCategoryID int64
}

type Category struct {
	Record
	Name string `sql:"size:254"`
}

type ProjectCategory struct {
	Record
	Name string `sql:"size:254" form:"Name"`
}

type ConceptStatus struct {
	Record
	Name        string `sql:"size:254"`
	Description string `sql:"size:254"`
}

type TechnicalStatus struct {
	Record
	Name        string `sql:"size:254"`
	Description string `sql:"size:254"`
}

type Package struct {
	Record
	ProjectID   int64
	Name        string `sql:"size:254"`
	Description string `sql:"size:255"`
	StartsAt    time.Time
	Category    Category
	CategoryID  sql.NullInt64
	Tasks       []Task
}

type Task struct {
	Record
	PackageID         int64
	ProjectID         int64
	Name              string `sql:"size:254"`
	Description       string `sql:"size:255"`
	AssignedTo        User
	AssignedToID      sql.NullInt64
	Estimations       []Estimation
	TechnicalStatus   TechnicalStatus
	TechnicalStatusID sql.NullInt64
	ConceptStatus     ConceptStatus
	ConceptStatusID   sql.NullInt64
}

type Estimation struct {
	Record
	TaskID           sql.NullInt64
	Comment          string `sql:"size:255"`
	EstimatedMinutes int
	Owner            User
	OwnerID          sql.NullInt64
}

type Customer struct {
	Record
	Name     string `sql:"size:255"`
	LegacyId string `sql:"size:255"`
}

func init() {
	if Db != nil {
		return
	}
	db, err := gorm.Open("sqlite3", "./alpinetime.sqlite")
	if err != nil {
		LastError = err
		return
	}
	db.AutoMigrate(
		&User{},
		&Project{},
		&Category{},
		&ConceptStatus{},
		&TechnicalStatus{},
		&Package{},
		&Task{},
		&Estimation{},
		&Customer{})
	Db = &db
}
