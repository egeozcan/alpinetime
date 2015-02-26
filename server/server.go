package server

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-gonic/contrib/sessions"
    "alpinetime/middleware"
    "alpinetime/server/routes"
)

func Create() *gin.Engine {
    server := gin.Default()
    secret := RandSeq(30)
    store := sessions.NewCookieStore([]byte(secret))

    server.Use(sessions.Sessions("alpinetime", store))

    server.GET("/", routes.Home)
    server.POST("/login", routes.Login("/list"))

    authorized := server.Group("/", middleware.CheckLogin())

    authorized.GET("/list", routes.ProtectedArea)
    authorized.GET("/logout", routes.Logout)

    return server
}