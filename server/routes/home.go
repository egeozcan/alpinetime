package routes

import(
    "github.com/gin-gonic/gin"
    "github.com/gin-gonic/contrib/sessions"
    "alpinetime/helpers"
    "fmt"
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
        message = "No."
    } else {
        message = ""
    }
    fmt.Fprintf(c.Writer, `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test</title>
        </head>
        <body>
            <p>%s</p>
            <form action="/login" method="POST">
                <label for="username">Username: </label>
                <input type="text" name="username" id="username" />
                <br /><br />
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" />
                <br /><br />
                <input type="submit" value="Submit" />
            </form>
        </body>
        </html>
    `, message)
}