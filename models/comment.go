package models

type Comment struct {
	Author   *User
	AuthorID int64 `json:",string" form:"AuthorID" validation:"ref(User)"`
	Title    string
	Content  string
}
