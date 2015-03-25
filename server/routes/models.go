package routes

import (
	"alpinetime/models"
	"github.com/gin-gonic/gin"
	"reflect"
)

func Models(c *gin.Context) {
	res := make(map[string]interface{})
	numFields := reflect.TypeOf(&models.Customer{}).Elem().NumField()
	for i := 0; i < numFields; i++ {
		field := reflect.TypeOf(&models.Customer{}).Elem().FieldByIndex([]int{i})
		if field.Anonymous {

		}
		res[field.Name] = field
	}
	c.JSON(200, res)
}
