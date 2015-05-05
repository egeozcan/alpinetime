// +build delayed

package server

import (
	"alpinetime/middleware"
	"fmt"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"math/rand"
	"time"
)

func Create() *gin.Engine {
	fmt.Println("DELAYED MODE!")
	gin.SetMode(gin.DebugMode)
	server := gin.Default()
	server.Use(gin.Recovery())
	//secret := RandSeq(30)
	store := sessions.NewCookieStore([]byte("secret"))

	server.Use(middleware.CheckAsset)
	server.Use(sessions.Sessions("alpinetime", store))
	authorized := server.Group("/", middleware.CheckLogin(), middleware.NoCache())

	routes := RouteList()

	rand.Seed(time.Now().UnixNano())
	for i := range *routes {
		route := (*routes)[i]
		if route.AuthLevel == 0 {
			server.Handle(route.Method, route.Path, []gin.HandlerFunc{route.Handler})
		} else {
			newHanlerFn := func(c *gin.Context) {
				delay := rand.Intn(3000) + 1000
				fmt.Println("delay: %s", delay)
				time.Sleep(time.Duration(delay) * time.Millisecond)
				route.Handler(c)
			}
			authorized.Handle(route.Method, route.Path, []gin.HandlerFunc{newHanlerFn})
		}
	}

	return server
}
