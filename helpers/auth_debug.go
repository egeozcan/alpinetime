// +build debug

package helpers

import (
	"fmt"
)

func init() {
	fmt.Println("NO AUTH!")
}

func Auth(username, password string) error {
	fmt.Println("NO AUTH!")
	return nil
}
