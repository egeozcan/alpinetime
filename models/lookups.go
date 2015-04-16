package models

type Lookup struct {
	Record
	Type         string `sql:"size:255"`
	Value        string `sql:"size:255"`
	Stamps       string `sql:"size:255"`
	Description  string `sql:"size:2000"`
	NumericValue int
	SortIndex    int
	Color        string `sql:"size:6"`
	LabelType    string `sql:"size:10"`
}
