package routes

import (
	"alpinetime/models"
	"alpinetime/models/connection"
	"github.com/gin-gonic/gin"
)

func Tasks(c *gin.Context) {
	tasks := &[]models.Task{}
	connection.Db.Find(tasks)
	c.JSON(200, tasks)
}

func CreateTask(c *gin.Context) {

}
