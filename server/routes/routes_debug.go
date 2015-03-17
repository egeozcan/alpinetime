// +build debug

package routes

import (
	"alpinetime/data"
	"alpinetime/helpers"
	"fmt"
	"github.com/gin-gonic/gin"
)

func RunTests(c *gin.Context) {
	helpers.WriteHeader(c.Writer, 200, "text/html")
	fileData, err := data.Asset("public/test.html")
	if err != nil {
		fmt.Errorf("error: %s", err)
		return
	}
	c.Writer.Write(fileData)
}
