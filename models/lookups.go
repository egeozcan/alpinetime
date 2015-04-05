package models

type Lookup struct {
	Record
	Type         string `sql:"size:255"`
	Key          string `sql:"size:255"`
	Value        string `sql:"size:255"`
	NumericValue int
	SortIndex    int
	Color        string `sql:"size:6"`
}
