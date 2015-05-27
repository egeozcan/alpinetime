package middleware

import (
	//"errors"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

func CheckLogin() func(c *gin.Context) {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		user := session.Get("username")
		if user == nil || user == "" {
			c.Writer.Header().Set("Location", "/")
			c.AbortWithStatus(301)
			//error := errors.New("Unauthorized")
			//c.Error(error, "Unauthorized")
			return
		}
		c.Set("user", user)
	}
}
