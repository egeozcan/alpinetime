package models

type Lookup struct {
	Type  string `sql:"size:255"`
	Name  string `sql:"size:255"`
	Value string `sql:"size:255"`
}
