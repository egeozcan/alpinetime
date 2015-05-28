// +build !debug

package helpers

import (
	"fmt"
	"github.com/go-ldap/ldap"
	"alpinetime/models"
	"alpinetime/models/connection"
)

var ldap_server string = "l-mobile.intern"
var ldap_port uint16 = 389

func Auth(username, password string) *models.User {
	l, err := ldap.Dial("tcp", fmt.Sprintf("%s:%d", ldap_server, ldap_port))
	if err != nil {
		return err
	}
	defer l.Close()
	if authErr := l.Bind(username, password); authErr == nil {
		usr := &models.User{
			Name: username,
			Password: password,
		}
		connection.Db.Where(usr).First(usr)
		return usr
	}
	return nil
}
