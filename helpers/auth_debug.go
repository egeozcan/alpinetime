// +build debug

package helpers

import (
	"alpinetime/models"
	"alpinetime/models/connection"
	"encoding/base64"
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

func init() {
	fmt.Println("NO AUTH!")
}

func Auth(username, password string) *models.User {
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("something went wrong with pass gen")
		return nil
	}
	fmt.Println(base64.StdEncoding.EncodeToString(hashedPwd))
	usr := &models.User{
		Name:     username,
		Password: base64.StdEncoding.EncodeToString(hashedPwd),
	}
	connection.Db.Where(usr).First(usr)
	if usr.ID == 0 {
		usr.Name = "test-user"
		usr.ID = 1
	}
	return usr
}
