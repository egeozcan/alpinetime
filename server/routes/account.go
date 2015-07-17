package routes

import (
	"alpinetime/data"
	"alpinetime/forms"
	"alpinetime/helpers"
	"fmt"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

func Login(redirectTo string) func(*gin.Context) {
	return func(c *gin.Context) {
		var form forms.LoginForm
		c.BindWith(&form, binding.Form)
		session := sessions.Default(c)
		user := helpers.Auth(form.User, form.Password)
		fmt.Printf("%v", user)
		if form.Password == "" || user.ID == 0 {
			c.Redirect(301, "/?error=badAuth")
			return
		}
		session.Set("username", user.Name)
		session.Set("userID", user.ID)
		session.Save()
		c.Redirect(301, redirectTo)
		return
	}
}

func Register(redirectTo string) func(*gin.Context) {
	return func(c *gin.Context) {
		var form forms.LoginForm
		c.BindWith(&form, binding.Form)
		session := sessions.Default(c)
		err := helpers.Register(form.User, form.Password)
		if err != nil {
			c.Redirect(301, "/register?error")
			return
		}
		user := helpers.Auth(form.User, form.Password)
		if user.ID == 0 {
			c.Redirect(301, "/?error=badAuth")
			return
		}
		session.Set("username", user.Name)
		session.Set("userID", user.ID)
		session.Save()
		c.Redirect(301, redirectTo)
		return
	}
}

func ProtectedArea(c *gin.Context) {
	helpers.WriteHeader(c.Writer, 200, "text/html")
	fileData, err := data.Asset("public/index.html")
	if err != nil {
		fmt.Errorf("error: %s", err)
		return
	}
	c.Writer.Write(fileData)
}

func Logout(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	session.Save()
	c.Redirect(301, "/")
}
