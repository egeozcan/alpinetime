package middleware

import (
	"alpinetime/data"
	"github.com/gin-gonic/gin"
	"strings"
)

func CheckAsset(c *gin.Context) {
	if !strings.HasPrefix(c.Request.URL.Path, "/public") {
		return
	}
	asset, err := data.Asset(strings.TrimPrefix(c.Request.URL.Path, "/"))
	if err == nil {
		c.Writer.Write(asset)
		c.AbortWithStatus(200)
	}
}
