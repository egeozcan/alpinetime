package routes

import (
	"alpinetime/models"
	"github.com/gin-gonic/gin"
	"strconv"
)

func Packages(c *gin.Context) {
	pkgs := &[]models.Package{}
	models.Db.Find(pkgs)
	c.JSON(200, pkgs)
}

func Package(c *gin.Context) {
	id, err := strconv.ParseInt(c.Params.ByName("packageID"), 10, 64)
	if err != nil {
		c.Error(err, "Id is required")
		return
	}
	pkg := &models.Package{}
	models.Db.Find(pkg, id)
	c.JSON(200, pkg)
}

func AddPackage(c *gin.Context) {

}
