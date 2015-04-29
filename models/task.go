package models

import (
	"time"
)

type Task struct {
	Record
	PackageID      int64  `json:",string"`
	ProjectID      int64  `json:",string"`
	Name           string `sql:"size:255"`
	Description    string `sql:"size:2000"`
	AssignedTo     *User
	AssignedToID   int64 `json:",string"`
	Estimations    []*Estimation
	TaskStatus     *Lookup `json:"-"`
	TaskStatusID   int64   `json:",string" validation:"ref(Lookup)"`
	TaskCategory   *Lookup `json:"-"`
	TaskCategoryID int64   `json:",string" validation:"ref(Lookup)"`
	TaskPriority   *Lookup `json:"-"`
	TaskPriorityID int64   `json:",string" validation:"ref(Lookup)"`
	StartedAt      time.Time
	BlockedBy      *Task
	BlockedByID    int64 `json:",string" form:"BlockedByID" validation:"ref(Task)"`
	Steps          []*Step
}
