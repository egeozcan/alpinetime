package models

import (
	"database/sql"
	"github.com/jinzhu/gorm"
	_ "github.com/mattn/go-sqlite3"
	"time"
)

type Record struct {
	ID        int64
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	DeletedAt time.Time `json:"deletedAt"`
}

type User struct {
	Record
	Domain   string    `sql:"size:255"`
	Name     string    `sql:"size:255"`
	Email    string    `sql:"size:254"`
	Projects []Project `gorm:"many2many:user_projects;"`
}

type Project struct {
	Record
	Name        string `sql:"size:254"`
	Description string `sql:"size:254"`
	Manager     User
	ManagerID   sql.NullInt64
	Users       []User `gorm:"many2many:user_projects;"`
	Customer    Customer
	CustomerID  sql.NullInt64
	Packages    []Package
}

type Category struct {
	Record
	Name string `sql:"size:254"`
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
	Name              string `sql:"size:254"`
	Description       string `sql:"size:255"`
	AssignedTo        User
	AssignedToID      sql.NullInt64
	Tags              []Tag `gorm:"many2many:task_tags;"`
	Estimations       []Estimation
	TechnicalStatus   TechnicalStatus
	TechnicalStatusID sql.NullInt64
	ConceptStatus     ConceptStatus
	ConceptStatusID   sql.NullInt64
}

type Tag struct {
	Record
	Name string `sql:"size:255"`
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

func InitDatabases(path string) (gorm.DB, error) {
	db, err := gorm.Open("sqlite3", path)
	if err != nil {
		return db, err
	}
	db.AutoMigrate(
		&User{},
		&Project{},
		&Category{},
		&ConceptStatus{},
		&TechnicalStatus{},
		&Package{},
		&Task{},
		&Tag{},
		&Estimation{},
		&Customer{})
	return db, nil
}
