package models

import (
	"database/sql"
	"github.com/jinzhu/gorm"
	_ "github.com/mattn/go-sqlite3"
	"time"
)

var Db *gorm.DB
var LastError error

type ID sql.NullInt64

type Record struct {
	ID        int64     `json:",string"`
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
	LastLogin time.Time `json:"-"`
}

type Project struct {
	Record
	Name              string `sql:"size:255" form:"Name"`
	Description       string `sql:"size:255" form:"Description"`
	Manager           *User  `json:",omitempty"`
	ManagerID         int64  `json:",string" form:"ManagerID"`
	Users             []User `gorm:"many2many:user_projects;"`
	Customer          *Customer
	CustomerID        int64 `json:",string" form:"CustomerID"`
	Packages          []Package
	Tasks             []Task
	ProjectCategory   *ProjectCategory
	ProjectCategoryID int64 `json:",string"`
}

type Category struct {
	Record
	Name        string `sql:"size:254"`
	Description string `sql:"size:255"`
}

type ProjectCategory struct {
	Record
	Name        string `sql:"size:254" form:"Name"`
	Description string `sql:"size:255"`
}

type ConceptStatus struct {
	Record
	Name        string `sql:"size:255"`
	Description string `sql:"size:255"`
}

type TechnicalStatus struct {
	Record
	Name        string `sql:"size:255"`
	Description string `sql:"size:255"`
}

type Package struct {
	Record
	ProjectID   int64  `json:",string"`
	Name        string `sql:"size:255"`
	Description string `sql:"size:255"`
	StartsAt    time.Time
	Category    *Category
	CategoryID  int64
	Tasks       []Task
}

type Task struct {
	Record
	PackageID         int64  `json:",string"`
	ProjectID         int64  `json:",string"`
	Name              string `sql:"size:255"`
	Description       string `sql:"size:255"`
	AssignedTo        *User
	AssignedToID      int64 `json:",string"`
	Estimations       []Estimation
	TechnicalStatus   *TechnicalStatus
	TechnicalStatusID int64 `json:",string"`
	ConceptStatus     *ConceptStatus
	ConceptStatusID   int64 `json:",string"`
}

type Estimation struct {
	Record
	TaskID           int64  `json:",string"`
	Comment          string `sql:"size:255"`
	EstimatedMinutes int
	Owner            *User
	OwnerID          int64 `json:",string"`
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
		&ProjectCategory{},
		&ConceptStatus{},
		&TechnicalStatus{},
		&Package{},
		&Task{},
		&Estimation{},
		&Customer{})
	Db = &db
}
