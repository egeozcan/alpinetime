package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/mattn/go-sqlite3"
	"time"
)

type Record struct {
	ID        int64
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt time.Time
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
	Name    string `sql:"size:254"`
	Manager User
	Users   []User
	Customer Customer
	Packages []Package
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
	Description string `sql:"size:255"`
	StartsAt    time.Time
	Category    Category
	Tasks       []Task
}

type Task struct {
	Record
	Description string `sql:"size:255"`
	AssignedTo  User
	Tags        []Tag `gorm:"many2many:task_tags;"`
	Estimations []Estimation
}

type Tag struct {
	Record
	Name string `sql:"size:255"`
}

type Estimation struct {
	Record
	EstimatedMinutes int
	Owner            User
}

type Customer struct {
	Record
	Name string `sql:"size:255"`
	LegacyId int
}
