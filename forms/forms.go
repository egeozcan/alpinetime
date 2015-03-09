package forms

import (
	"time"
)

type LoginForm struct {
	User     string `form:"username" binding:"required"`
	Password string `form:"password" binding:"required"`
}

type ProjectQuery struct {
	Name        string `form:"name"`
	Description string `form:"description"`
	StartDate   time.Time
}

type PackageQuery struct {
	Name        string `form:"name"`
	Description string `form:"description"`
	StartDate   time.Time
}
