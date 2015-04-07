package models

import (
	"time"
)

type User struct {
	Record
	Domain    string     `sql:"size:255" form:"domain" binding:"required"`
	Name      string     `sql:"size:255" form:"username" binding:"required" validation:"text,minLength(3)"`
	Email     string     `sql:"size:254" form:"email" validation:"email"`
	Password  string     `sql:"-" form:"password" binding:"required" validation:"password,minLength(3)"`
	Projects  []*Project `gorm:"many2many:user_projects;"`
	LastLogin time.Time  `json:"-"`
}
