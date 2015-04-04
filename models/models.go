package models

import (
	"database/sql"
	"time"
)

type ID sql.NullInt64

type Record struct {
	ID        int64     `json:",string"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	DeletedAt time.Time `json:"deletedAt"`
}

type User struct {
	Record
	Domain    string     `sql:"size:255" form:"domain" binding:"required"`
	Name      string     `sql:"size:255" form:"username" binding:"required" validation:"text,minLength(3)"`
	Email     string     `sql:"size:254" form:"email" validation:"email"`
	Password  string     `sql:"-" form:"password" binding:"required" validation:"password,minLength(3)"`
	Projects  []*Project `gorm:"many2many:user_projects;"`
	LastLogin time.Time  `json:"-"`
}

type Project struct {
	Record
	Name        string  `sql:"size:255" form:"Name" validation:"text,minLength(3)"`
	Description string  `sql:"size:2000" form:"Description" validation:"text"`
	Manager     *User   `json:",omitempty"`
	ManagerID   int64   `json:",string" form:"ManagerID" validation:"ref(User)"`
	Users       []*User `gorm:"many2many:user_projects;"`
	Customer    *Customer
	CustomerID  int64 `json:",string" form:"CustomerID" validation:"ref(Customer)"`
	Packages    []*Package
	Tasks       []*Task
	Category    Lookup `validation:"lookup(ProjectCategory)"`
	CategoryID  int64  `json:",string" form:"CategoryID" validation:"ref(Lookup)"`
}

type Package struct {
	Record
	ProjectID   int64  `json:",string"`
	Name        string `sql:"size:255"`
	Description string `sql:"size:2000"`
	StartsAt    time.Time
	Tasks       []*Task
}

type Task struct {
	Record
	PackageID    int64  `json:",string"`
	ProjectID    int64  `json:",string"`
	Name         string `sql:"size:255"`
	Description  string `sql:"size:2000"`
	AssignedTo   *User
	AssignedToID int64 `json:",string"`
	Estimations  []*Estimation
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
	Name        string `sql:"size:255"`
	Description string `sql:"size:2000"`
	LegacyId    string `sql:"size:255"`
}

type Comment struct {
	Author   *User
	AuthorID int64 `json:",string" form:"AuthorID" validation:"ref(User)"`
	Title    string
	Content  string
}
