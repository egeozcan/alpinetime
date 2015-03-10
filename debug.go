// +build debug

package main

import (
	"alpinetime/models"
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
	db = models.Db
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
	technicalStatuses := make([]interface{}, 5)
	for i := 0; i < 5; i++ {
		technicalStatus := models.TechnicalStatus{
			Name:        randomdata.SillyName(),
			Description: randomdata.Paragraph(),
		}
		db.Create(&technicalStatus)
		technicalStatuses[i] = &technicalStatus
	}
	conceptStatuses := make([]interface{}, 5)
	for i := 0; i < 5; i++ {
		conceptStatus := models.ConceptStatus{
			Name:        randomdata.SillyName(),
			Description: randomdata.Paragraph(),
		}
		db.Create(&conceptStatus)
		conceptStatuses[i] = &conceptStatus
	}
	projectCategories := make([]interface{}, 5)
	for i := 0; i < 5; i++ {
		projectCategory := models.ProjectCategory{
			Name:        randomdata.SillyName(),
			Description: randomdata.Paragraph(),
		}
		db.Create(&projectCategory)
		projectCategories[i] = &projectCategory
	}
	categories := make([]interface{}, 5)
	for i := 0; i < 5; i++ {
		category := models.Category{
			Name:        randomdata.SillyName(),
			Description: randomdata.Paragraph(),
		}
		db.Create(&category)
		categories[i] = &category
	}
	customers := make([]interface{}, 5)
	for i := 0; i < 5; i++ {
		customer := models.Customer{
			Name:     randomdata.SillyName(),
			LegacyId: fmt.Sprintf("LEGACY%v", randomdata.Number(1, 2000)),
		}
		db.Create(&customer)
		customers[i] = &customer
	}
	for i := 0; i < 10; i++ {
		project := models.Project{
			Name:            randomdata.SillyName(),
			Description:     randomdata.Paragraph(),
			Manager:         &user,
			Users:           []*models.User{&user},
			Customer:        randomFrom(customers).(*models.Customer),
			ProjectCategory: randomFrom(projectCategories).(*models.ProjectCategory),
			Tasks:           []*models.Task{},
		}
		db.Create(&project)
		fmt.Printf("Created project %v\n", project.ID)
		for y := 0; y < randomdata.Number(2, 5); y++ {
			taskAmount := randomdata.Number(5, 10)
			tasks := make([]*models.Task, taskAmount)
			for z := 0; z < taskAmount; z++ {
				task := models.Task{
					Name:            fmt.Sprintf("Package %v", z),
					Description:     randomdata.Paragraph(),
					AssignedTo:      &user,
					TechnicalStatus: randomFrom(technicalStatuses).(*models.TechnicalStatus),
					ConceptStatus:   randomFrom(conceptStatuses).(*models.ConceptStatus),
					ProjectID:       project.ID,
				}
				tasks[z] = &task
			}
			projectPackage := &models.Package{
				Name:        fmt.Sprintf("Package %v", y),
				Description: randomdata.Paragraph(),
				StartsAt:    time.Now(),
				Category:    randomFrom(categories).(*models.Category),
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
