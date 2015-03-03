package routes

import (
	"alpinetime/data"
	"alpinetime/helpers"
	"fmt"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

func LoginPage(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get("username")
	if user != nil && user != "" {
		c.Redirect(301, "/app/projects")
		return
	}
	helpers.WriteHeader(c.Writer, 200, "text/html")
	fileData, err := data.Asset("public/login.html")
	if err != nil {
		fmt.Errorf("error: %s", err)
		return
	}
	c.Writer.Write(fileData)
}
