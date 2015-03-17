// +build !debug

package routes

import (
	"alpinetime/data"
	"alpinetime/helpers"
	"fmt"
	"github.com/gin-gonic/gin"
)

func RunTests(c *gin.Context) {
	c.Redirect(304, "/")
}
