// +build !debug
// +build !delayed

package server

import (
	"alpinetime/middleware"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

func Create() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	server := gin.Default()
	server.Use(gin.Recovery())
	//secret := RandSeq(30)
	store := sessions.NewCookieStore([]byte("secret"))

	server.Use(middleware.CheckAsset)
	server.Use(sessions.Sessions("alpinetime", store))
	authorized := server.Group("/", middleware.CheckLogin(), middleware.NoCache())

	routes := RouteList()

	for i := range *routes {
		route := (*routes)[i]
		if route.AuthLevel == 0 {
			server.Handle(route.Method, route.Path, route.Handler)
		} else {
			authorized.Handle(route.Method, route.Path, route.Handler)
		}
	}

	return server
}
