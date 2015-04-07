package models

import (
	"time"
)

type Task struct {
	Record
	PackageID        int64  `json:",string"`
	ProjectID        int64  `json:",string"`
	Name             string `sql:"size:255"`
	Description      string `sql:"size:2000"`
	AssignedTo       *User
	AssignedToID     int64 `json:",string"`
	Estimations      []*Estimation
	TaskStatus       *Lookup
	TaskStatusID     int64 `json:",string" validation:"ref(Lookup)"`
	TaskCategory     *Lookup
	TaskCategoryID   int64 `json:",string" validation:"ref(Lookup)"`
	TaskPriority     *Lookup
	TaskPriorityID   int64 `json:",string" validation:"ref(Lookup)"`
	EstimatedMinutes int
	SpentMinutes     int
	StartedAt        time.Time
	BlockedBy        *Task
	BlockedByID      int64 `json:",string" form:"BlockedByID" validation:"ref(User)"`
}

type TaskJSON struct {
	PackageID        int64 `json:",string"`
	ProjectID        int64 `json:",string"`
	Name             string
	Description      string
	AssignedToID     int64 `json:",string"`
	TaskCategoryID   int64 `json:",string"`
	TaskPriorityID   int64 `json:",string"`
	EstimatedMinutes int
	SpentMinutes     int
	StartedAt        time.Time
	BlockedByID      int64 `json:",string"`
}
