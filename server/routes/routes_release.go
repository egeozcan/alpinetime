// +build !debug

package routes

import (
	"github.com/gin-gonic/gin"
)

func RunTests(c *gin.Context) {
	c.Redirect(304, "/")
}
