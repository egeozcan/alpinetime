// +build debug

package main

import (
	"alpinetime/models"
	"alpinetime/models/connection"
	"fmt"
	"github.com/Pallinder/go-randomdata"
	"github.com/jinzhu/gorm"
	"math/rand"
	"time"
)

var (
	db *gorm.DB
)

func init() {
	db = connection.Db
	//db.LogMode(true)
	dbproject := db.First(&models.Project{}).Value.(*models.Project)
	if dbproject.ID != 0 {
		fmt.Printf(
			"Debug build, a project with ID %v exists already.\n",
			dbproject.ID,
		)
		fmt.Println("So, no fancy data generation")
		return
	}
	fmt.Println("Debug build, adding example data")
	user := models.User{
		Domain:   "TestDomain",
		Name:     randomdata.FullName(randomdata.RandomGender),
		Email:    randomdata.Email(),
		Projects: []*models.Project{},
	}
	db.Create(&user)
	customers := make([]interface{}, 500)
	for i := 0; i < 60; i++ {
		customer := models.Customer{
			Name:     randomdata.SillyName(),
			LegacyId: fmt.Sprintf("LEGACY%v", randomdata.Number(1, 2000)),
		}
		db.Create(&customer)
		customers[i] = &customer
	}
	for i := 0; i < 100; i++ {
		project := models.Project{
			Name:        randomdata.SillyName(),
			Description: randomdata.Paragraph(),
			Manager:     &user,
			Users:       []*models.User{&user},
			Customer:    randomFrom(customers).(*models.Customer),
			Tasks:       []*models.Task{},
		}
		db.Create(&project)
		fmt.Printf("Created project %v\n", project.ID)
		for y := 0; y < randomdata.Number(2, 5); y++ {
			taskAmount := randomdata.Number(5, 10)
			tasks := make([]*models.Task, taskAmount)
			for z := 0; z < taskAmount; z++ {
				task := models.Task{
					Name:        fmt.Sprintf("Task %v", z),
					Description: randomdata.Paragraph(),
					AssignedTo:  &user,
					ProjectID:   project.ID,
				}
				tasks[z] = &task
			}
			projectPackage := &models.Package{
				Name:        fmt.Sprintf("Package %v", y),
				Description: randomdata.Paragraph(),
				StartsAt:    time.Now(),
				Tasks:       tasks,
			}
			db.Create(&projectPackage)
			fmt.Printf("Created package %v\n", projectPackage.ID)
			project.Packages = append(project.Packages, projectPackage)
			project.Tasks = append(project.Tasks, tasks...)
		}
		for index, el := range project.Tasks {
			fmt.Printf("%v_ Project %v Task.ProjectID %v \n", index, project.ID, el.ProjectID)
		}
		db.Save(&project)
	}
}

func seedAndReturnRandom(n int) int {
	rand.Seed(time.Now().UnixNano())
	return rand.Intn(n)
}

// Returns a random part of a slice
func randomFrom(source []interface{}) interface{} {
	return source[seedAndReturnRandom(len(source))]
}
