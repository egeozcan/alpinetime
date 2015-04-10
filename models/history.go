package models

type History struct {
	Record
	ProjectID   int64 `json:",string"`
	ChangedType string
	ChangedFrom string
	ChangeTo    string
}
