package models

type Estimation struct {
	Record
	TaskID           int64  `json:",string"`
	Comment          string `sql:"size:255"`
	EstimatedMinutes int
	Owner            *User
	OwnerID          int64 `json:",string"`
}
