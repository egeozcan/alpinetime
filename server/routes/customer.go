package routes

import (
	"alpinetime/models"
	"github.com/gin-gonic/gin"
	"strconv"
)

func Customers(c *gin.Context) {
	if accepts, err := c.Get("accepts"); accepts == "html" && err == nil {
		ProtectedArea(c)
		return
	}
	customers := &[]models.Customer{}
	models.Db.Find(customers)
	c.JSON(200, customers)
}

func Customer(c *gin.Context) {
	if accepts, err := c.Get("accepts"); accepts == "html" && err == nil {
		ProtectedArea(c)
		return
	}
	id, err := strconv.ParseInt(c.Params.ByName("customerID"), 10, 64)
	if err != nil {
		c.Error(err, "Id is required")
		return
	}
	customer := &models.Customer{}
	models.Db.Find(customer, id)
	c.JSON(200, customer)
}

func AddCustomer(c *gin.Context) {

}
