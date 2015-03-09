package routes

import (
	"alpinetime/models"
	"fmt"
	"github.com/gin-gonic/gin"
)

func Projects(c *gin.Context) {
	if accepts, err := c.Get("accepts"); accepts == "html" && err == nil {
		ProtectedArea(c)
		return
	}
	models.Db.LogMode(true)
	dbResults := models.Db.Limit(10).Find(&[]models.Project{})
	fmt.Printf("Affected: %v Rows", dbResults.RowsAffected)
	c.JSON(200, dbResults.Value)
}

func AddProject(c *gin.Context) {

}
