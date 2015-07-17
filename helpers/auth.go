package helpers

import (
	"alpinetime/models"
	"alpinetime/models/connection"
	"encoding/base64"
	"errors"
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

func Register(username, password string) error {
	if len(username) == 0 || len(password) == 0 || len(password) > 64 || len(username) > 64 {
		return errors.New("Nope")
	}
	usr := &models.User{
		Name: username,
	}
	connection.Db.Select("ID").Where(usr).First(usr)
	if usr.ID != 0 {
		return errors.New("Username is taken")
	}
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	fmt.Println(base64.StdEncoding.EncodeToString(hashedPwd))
	usr.Password = base64.StdEncoding.EncodeToString(hashedPwd)
	connection.Db.Save(usr)
	return nil
}
