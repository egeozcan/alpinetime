package routes

import (
	"alpinetime/models"
	"github.com/gin-gonic/gin"
)

func Tasks(c *gin.Context) {
	tasks := &[]models.Task{}
	models.Db.
		Find(tasks)
	c.JSON(200, tasks)
}
