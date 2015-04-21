package routes

import (
	"alpinetime/models"
	"alpinetime/models/connection"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"strconv"
)

func Packages(c *gin.Context) {
	pkgs := &[]models.Package{}
	connection.Db.Find(pkgs)
	c.JSON(200, pkgs)
}

func Package(c *gin.Context) {
	id, err := strconv.ParseInt(c.Params.ByName("packageID"), 10, 64)
	if err != nil {
		c.Error(err, "Id is required")
		return
	}
	pkg := &models.Package{}
	connection.Db.Find(pkg, id)
	c.JSON(200, pkg)
}

func AddPackage(c *gin.Context) {
	var pkg models.Package
	c.BindWith(&pkg, binding.JSON)
	if pkg.Name == "" || pkg.ProjectID == 0 {
		var err = errors.New("Package name and project ID are needed.")
		c.Fail(500, err)
		return
	}
	connection.Db.Save(&pkg)
	c.JSON(200, pkg)
}
