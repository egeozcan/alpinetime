package routes

import (
	"alpinetime/models"
	"alpinetime/models/connection"
	"github.com/gin-gonic/gin"
)

func TimeEntries(c *gin.Context) {
	timeentries := &[]models.TimeEntry{}
	connection.Db.Find(timeentries)
	c.JSON(200, timeentries)
}
