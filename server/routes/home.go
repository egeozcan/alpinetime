package routes

import (
	"alpinetime/helpers"
	"fmt"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

func Home(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get("username")
	if user != nil && user != "" {
		c.Redirect(301, "/list")
		return
	}
	helpers.WriteHeader(c.Writer, 200, "text/html")
	message := c.Request.FormValue("guessWhat")
	if message == "passwordiswrong" {
		message = `
        <div class="alert alert-danger" role="alert">
            Wrong.
        </div>`
	} else {
		message = ""
	}
	fmt.Fprintf(c.Writer, `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test</title>
            <link rel="stylesheet" href="/public/css/app.css">
            <link rel="stylesheet" href="/public/css/login.css">
        </head>
        <body>
            <div class="container">
            %s
            <form action="/login" method="POST" class="form-signin">
                <h2 class="form-signin-heading">You should have these</h2>
                <label for="username">Username</label>
                <input type="text" name="username" id="username" class="form-control" placeholder="Username" autofocus required>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="Password" required>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
            </div>
        </body>
        </html>
    `, message)
}
