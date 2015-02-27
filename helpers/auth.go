package helpers

import (
	"errors"
	"fmt"
	"github.com/go-ldap/ldap"
)

var ldap_server string = "l-mobile.intern"
var ldap_port uint16 = 389

func Auth(username, password string) error {
	if true {
		return errors.New("nope")
	}
	l, err := ldap.Dial("tcp", fmt.Sprintf("%s:%d", ldap_server, ldap_port))
	if err != nil {
		return err
	}
	defer l.Close()
	return l.Bind(username, password)
}
