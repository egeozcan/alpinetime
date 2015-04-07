package models

import (
	"time"
)

type Package struct {
	Record
	ProjectID              int64  `json:",string"`
	Name                   string `sql:"size:255"`
	Description            string `sql:"size:2000"`
	StartsAt               time.Time
	Tasks                  []*Task
	PackageRiskCategory    *Lookup
	PackageRiskCategoryID  int64 `json:",string" validation:"ref(Lookup)"`
	PackageConceptStatus   *Lookup
	PackageConceptStatusID int64 `json:",string" validation:"ref(Lookup)"`
	PackageCategory        *Lookup
	PackageCategoryID      int64 `json:",string" validation:"ref(Lookup)"`
}
