package routes

import (
	"alpinetime/models"
	"github.com/gin-gonic/gin"
	"reflect"
	"strings"
)

func getFields(model interface{}, res *map[string]interface{}) {
	mytype := reflect.TypeOf(model).Elem()
	numFields := mytype.NumField()
	for i := 0; i < numFields; i++ {
		field := mytype.FieldByIndex([]int{i})
		if field.Anonymous || field.Type.Name() == "" {
			continue
		}
		if idreffield, _ := mytype.FieldByName(field.Name + "ID"); idreffield.Name != "" {
			continue
		}
		name := strings.Split(field.Tag.Get("json"), ",")[0]
		if name == "-" {
			continue
		}
		if len(name) == 0 {
			name = field.Name
		}
		rules := strings.Split(field.Tag.Get("validation"), ",")
		ruleMap := make(map[string]interface{})
		ruleMap["type"] = field.Type.Name()
		for i := 0; i < len(rules); i++ {
			var rule = strings.Split(strings.TrimRight(rules[i], ")"), "(")
			if len(rule) == 2 {
				ruleMap[rule[0]] = rule[1]
			}
		}
		ruleMap["index"] = i
		(*res)[name] = ruleMap
	}
}

func Definitions(c *gin.Context) {
	res := make(map[string]map[string]interface{})
	structs := []interface{}{
		&models.Package{},
		&models.Project{},
		&models.Task{},
		&models.User{},
	}
	for i := 0; i < len(structs); i++ {
		name := reflect.TypeOf(structs[i]).Elem().Name()
		tres := make(map[string]interface{})
		getFields(structs[i], &tres)
		res[name] = tres
	}
	c.JSON(200, res)
}
