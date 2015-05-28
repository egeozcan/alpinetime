package models

import (
	"time"
)

type User struct {
	Record
	Domain      string     `sql:"size:255" form:"domain" binding:"required"`
	Name        string     `sql:"size:255" form:"username" binding:"required" validation:"minLength(3)"`
	Email       string     `sql:"size:254" form:"email" validation:"custom(email)"`
	Password    string     `sql:"size:500" form:"password" binding:"required" json:"-" validation:"password,minLength(3)"`
	Projects    []*Project `gorm:"many2many:user_projects;"`
	TimeEntries []*TimeEntry
	LastLogin   time.Time `json:"-"`
}
