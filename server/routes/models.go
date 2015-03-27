package routes

import (
	"alpinetime/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"reflect"
)

func getFields(model interface{}, res *map[string]interface{}) {
	mytype := reflect.TypeOf(model).Elem()
	numFields := mytype.NumField()
	for i := 0; i < numFields; i++ {
		field := mytype.FieldByIndex([]int{i})
		if field.Anonymous {
			if field.Name == "Record" {
				getFields(&models.Record{}, res)
			}
			continue
		}
		(*res)[field.Name] = field
	}
}

func Models(c *gin.Context) {
	res := make(map[string]map[string]interface{})
	structs := []interface{}{
		&models.Package{},
		&models.Project{},
		&models.Task{},
	}
	for i := 0; i < len(structs); i++ {
		name := reflect.TypeOf(structs[i]).Elem().Name()
		fmt.Println(name)
		tres := make(map[string]interface{})
		getFields(structs[i], &tres)
		res[name] = tres
	}
	c.JSON(200, res)
}
