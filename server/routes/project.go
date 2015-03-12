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
	projects := &[]models.Project{}
	models.Db.
		Preload("Customer").
		Preload("Manager").
		Preload("ProjectCategory").
		Find(projects)
	c.JSON(200, projects)
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
	project := &models.Project{}
	models.Db.
		Preload("Customer").
		Preload("Manager").
		Preload("ProjectCategory").
		Preload("Packages").
		Find(project, id)
	c.JSON(200, project)
}

func AddProject(c *gin.Context) {

}
