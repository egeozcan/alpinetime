package server

import (
	"alpinetime/middleware"
	"alpinetime/server/routes"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

func Create() *gin.Engine {
	server := gin.Default()
	secret := RandSeq(30)
	store := sessions.NewCookieStore([]byte(secret))

	server.Use(middleware.CheckAsset)
	server.Use(sessions.Sessions("alpinetime", store))

	server.GET("/", routes.Home)
	server.POST("/login", routes.Login("/list"))

	authorized := server.Group("/", middleware.CheckLogin())

	authorized.GET("/list", routes.ProtectedArea)
	authorized.GET("/logout", routes.Logout)

	return server
}
