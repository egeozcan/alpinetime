package models

import (
	"time"
)

type Record struct {
	ID           int64     `json:",string"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
	DeletedAt    time.Time `json:"deletedAt"`
	CreateUser   *User     `json:",omitempty"`
	CreateUserID int64     `json:",string" form:"CreateUserID" validation:"ref(User)"`
	ModifyUser   *User     `json:",omitempty"`
	ModifyUserID int64     `json:",string" form:"ModifyUserID" validation:"ref(User)"`
}
