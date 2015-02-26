package routes

import (
    "fmt"
    "github.com/gin-gonic/gin"
    "alpinetime/forms"
    "alpinetime/helpers"
    "github.com/gin-gonic/gin/binding"
    "github.com/gin-gonic/contrib/sessions"
)

func Login(redirectTo string) func(*gin.Context) {
    return func(c *gin.Context) {
        var form forms.LoginForm
        c.BindWith(&form, binding.Form)
        session := sessions.Default(c)
        if form.Password == "" || helpers.Auth(form.User, form.Password) != nil {
            c.Redirect(301, "/?guessWhat=passwordiswrong")
            return
        }
        session.Set("username", form.User)
        session.Save()
        c.Redirect(301, redirectTo)
        return
    }
}

func ProtectedArea(c *gin.Context) {
    user := c.MustGet("user")
    helpers.WriteHeader(c.Writer, 200, "text/html")
    fmt.Fprintf(c.Writer, `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test</title>
        </head>
        <body>
            <h1>WELCOME %s!</h1>
            <a href="/logout">ok bye</a>
        </body>
        </html>
    `, user)
}

func Logout(c *gin.Context) {
    session := sessions.Default(c)
    session.Clear()
    session.Save()
    c.Redirect(301, "/")
}