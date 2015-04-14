package routes

import (
	"alpinetime/models"
	"alpinetime/models/connection"
	"github.com/gin-gonic/gin"
)

func Lookups(c *gin.Context) {
	lookups := &[]models.Lookup{}
	connection.Db.
		Find(lookups)
	c.JSON(200, lookups)
}
