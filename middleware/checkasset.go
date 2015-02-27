package middleware

import (
	"alpinetime/data"
	"github.com/gin-gonic/gin"
	"strings"
)

func CheckAsset(c *gin.Context) {
	var path = strings.Trim(c.Request.URL.Path, "/")
	asset, err := data.Asset(path)
	if err == nil {
		c.Writer.Write(asset)
		c.AbortWithStatus(200)
	}
}
