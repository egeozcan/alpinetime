package routes

import (
	"alpinetime/models"
	"alpinetime/models/connection"
	"github.com/gin-gonic/gin"
	"strconv"
)

func Projects(c *gin.Context) {
	projects := &[]models.Project{}
	connection.Db.
		Find(projects)
	c.JSON(200, projects)
}

func Project(c *gin.Context) {
	id, err := strconv.ParseInt(c.Params.ByName("projectID"), 10, 64)
	if err != nil {
		c.AbortWithError(500, err)
		return
	}
	project := &models.Project{}
	connection.Db.
		Preload("Customer").
		Preload("Manager").
		Preload("ProjectCategory").
		Preload("Packages").
		Preload("Tasks").
		Find(project, id)
	for i := 0; i < len(project.Packages); i++ {
		project.Packages[i].Tasks = []*models.Task{}
		for y := 0; y < len(project.Tasks); y++ {
			if task := project.Tasks[y]; task.PackageID == project.Packages[i].ID {
				project.Packages[i].Tasks = append(project.Packages[i].Tasks, task)
			}
		}
	}
	project.Tasks = []*models.Task{}
	c.JSON(200, project)
}

func AddProject(c *gin.Context) {

}
