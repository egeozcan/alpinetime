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
	server.Use(sessions.Sessions("alpinetime", store))

	server.GET("/", routes.LoginPage)
	server.POST("/login", routes.Login("/app/projects"))

	authorized := server.Group("/", middleware.CheckLogin())

	authorized.GET("/logout", routes.Logout)

	authorized.GET("/test/*catchAll", routes.RunTests)

	authorized.GET("/app/customers", routes.ProtectedArea)
	authorized.GET("/app/customer/:customerID", routes.ProtectedArea)
	authorized.GET("/app/projects", routes.ProtectedArea)
	authorized.GET("/app/project/:projectID", routes.ProtectedArea)

	authorized.GET("/api/customers", routes.Customers)
	authorized.GET("/api/customer/:customerID", routes.Customer)
	authorized.GET("/api/projects", routes.Projects)
	authorized.GET("/api/project/:projectID", routes.Project)
	authorized.GET("/api/tasks", routes.Tasks)
	authorized.GET("/api/packages", routes.Packages)
	authorized.GET("/api/models", routes.Models)

	return server
}
