package models

import (
	"time"
)

type TimeEntry struct {
	Record
	TaskID      int64 `json:",string"`
	UserID      int64 `json:",string"`
	StartedTime time.Time
	StopTime    time.Time
	Description string `sql:"size:2000"`
}
