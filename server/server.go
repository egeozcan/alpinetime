package server

import (
	"alpinetime/middleware"
	"alpinetime/server/routes"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

func Create() *gin.Engine {
	server := gin.Default()
	//secret := RandSeq(30)
	store := sessions.NewCookieStore([]byte("secret"))

	server.Use(middleware.CheckAsset)
	server.Use(middleware.SetAccepts())
	server.Use(sessions.Sessions("alpinetime", store))

	server.GET("/", routes.LoginPage)
	server.POST("/login", routes.Login("/app/projects"))

	authorized := server.Group("/", middleware.CheckLogin())

	authorized.GET("/logout", routes.Logout)
	authorized.GET("/app/projects", routes.Projects)
	authorized.GET("/app/project/:projectID", routes.Project)

	return server
}
