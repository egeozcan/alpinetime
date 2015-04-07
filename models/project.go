package models

type Project struct {
	Record
	Name              string  `sql:"size:255" form:"Name" validation:"text,minLength(3)"`
	Description       string  `sql:"size:2000" form:"Description" validation:"text"`
	Manager           *User   `json:",omitempty"`
	ManagerID         int64   `json:",string" form:"ManagerID" validation:"ref(User)"`
	Users             []*User `gorm:"many2many:user_projects;"`
	Customer          *Customer
	CustomerID        int64 `json:",string" form:"CustomerID" validation:"ref(Customer)"`
	Packages          []*Package
	Tasks             []*Task
	ProjectCategory   *Lookup
	ProjectCategoryID int64 `json:",string" validation:"ref(Lookup)"`
}
