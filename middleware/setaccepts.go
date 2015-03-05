package middleware

import (
	"github.com/gin-gonic/gin"
	"strings"
)

func SetAccepts() func(*gin.Context) {
	return func(c *gin.Context) {
		acceptsHeader := c.Request.Header.Get("Accept")
		if strings.HasPrefix(acceptsHeader, "text/html") || strings.Contains(acceptsHeader, "text/html") {
			c.Set("accepts", "html")
			return
		}
		c.Set("accepts", "json")
	}
}
