// +build debug

package helpers

import (
	"fmt"
	"alpinetime/models"
	"alpinetime/models/connection"
)

func init() {
	fmt.Println("NO AUTH!")
}

func Auth(username, password string) *models.User {
	usr := &models.User{
		Name: username,
		Password: password,
	}
	connection.Db.Where(usr).First(usr)
	return usr
}
