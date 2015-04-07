package models

type Customer struct {
	Record
	Name               string `sql:"size:255"`
	Description        string `sql:"size:2000"`
	LegacyId           string `sql:"size:255"`
	CustomerCategory   *Lookup
	CustomerCategoryID int64 `json:",string" validation:"ref(Lookup)"`
}
