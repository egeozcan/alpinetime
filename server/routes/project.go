package routes

import (
	"alpinetime/models"
	"github.com/gin-gonic/gin"
	"strconv"
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

func Project(c *gin.Context) {
	if accepts, err := c.Get("accepts"); accepts == "html" && err == nil {
		ProtectedArea(c)
		return
	}
	id, err := strconv.ParseInt(c.Params.ByName("projectID"), 10, 64)
	if err != nil {
		c.Error(err, "Id is required")
		return
	}
	dbResults := models.Db.First(&models.Project{}, id)
	c.JSON(200, dbResults.Value)
}

func AddProject(c *gin.Context) {

}
