// +build debug

package helpers

import (
	"fmt"
)

func Auth(username, password string) error {
	fmt.Println("NO AUTH!")
	return nil
}
