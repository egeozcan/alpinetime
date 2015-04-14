package middleware

import (
	"github.com/gin-gonic/gin"
)

func NoCache() func(c *gin.Context) {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		c.Writer.Header().Set("Pragma", "no-cache")
		c.Writer.Header().Set("Expires", "0")
	}
}
