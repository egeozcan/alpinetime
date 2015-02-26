package forms

type LoginForm struct {
    User     string `form:"username" binding:"required"`
    Password string `form:"password" binding:"required"`
}