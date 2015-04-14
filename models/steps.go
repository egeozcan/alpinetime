package models

type Step struct {
	Record
	TaskID      int64  `json:",string"`
	Description string `sql:"size:2000"`
	Completed   bool
}
