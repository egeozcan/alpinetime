package routes

import (
	"alpinetime/models"
	"github.com/gin-gonic/gin"
)

func Projects(c *gin.Context) {
	if accepts, err := c.Get("accepts"); accepts == "html" && err == nil {
		ProtectedArea(c)
		return
	}
	db, err := models.InitDatabases("./alpinetime.sqlite")
	if err != nil {
		panic("omg")
	}
	var user models.User
	c.JSON(200, db.First(&user).Value)
}
