package middleware

import (
	"alpinetime/data"
	"github.com/gin-gonic/gin"
	"mime"
	"path/filepath"
	"strings"
)

func CheckAsset(c *gin.Context) {
	if !strings.HasPrefix(c.Request.URL.Path, "/public") {
		return
	}
	//get rid of the slash at the beginning of the path
	fileName := c.Request.URL.Path[1:]
	fileData, err := data.Asset(fileName)
	if err != nil {
		//no static file for this path is registered
		return
	}
	ext := filepath.Ext(fileName)
	var mimeType string
	if ext != "" {
		mimeType = mime.TypeByExtension(ext)
	}
	if mimeType == "" {
		mimeType = "application/octet-stream"
	}
	c.AbortWithStatus(200)
	c.Writer.Header().Set(`Content-Type`, mimeType)
	c.Writer.Write(fileData)
}
