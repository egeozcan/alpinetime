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
	dbResults := models.Db.
		Limit(10).
		Find(&[]models.Project{})
	c.JSON(200, dbResults.Value)
}

func AddProject(c *gin.Context) {

}
