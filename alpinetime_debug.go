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
	rand.Seed(time.Now().UnixNano())
	sortIndex := 0
	getSortIndex := func() int {
		sortIndex++
		return sortIndex
	}
	projectCategoryLookups := []*models.Lookup{
		&models.Lookup{Type: "ProjectCategory", Key: "customer", Value: "Customer", NumericValue: 0, SortIndex: getSortIndex(), Description: `A project for a customer - most projects are in this category`},
		&models.Lookup{Type: "ProjectCategory", Key: "internal", Value: "Internal", NumericValue: 0, SortIndex: getSortIndex(), Description: `Internal project, i.e. the customer employs the project team`},
		&models.Lookup{Type: "ProjectCategory", Key: "other", Value: "Other", NumericValue: 0, SortIndex: getSortIndex(), Description: `A project with a custom structure`, Stamps: "explain"},
	}
	for i := 0; i < len(projectCategoryLookups); i++ {
		db.Create(projectCategoryLookups[i])
	}
	sortIndex = 0

	packageCategoryLookups := []*models.Lookup{
		&models.Lookup{Type: "PackageCategory", Key: "order", Value: "Order", SortIndex: getSortIndex(), Description: `Package is, or will be a one-time order`},
		&models.Lookup{Type: "PackageCategory", Key: "maintenance", Value: "Maintenance", SortIndex: getSortIndex(), Description: `A maintenance package with incident-based tasks`},
		&models.Lookup{Type: "PackageCategory", Key: "ongoing", Value: "Ongoing", SortIndex: getSortIndex(), Description: `Like employment and support contracts`},
	}
	for i := 0; i < len(packageCategoryLookups); i++ {
		db.Create(packageCategoryLookups[i])
	}
	sortIndex = 0

	packageRiskCategoryLookups := []*models.Lookup{
		&models.Lookup{Type: "PackageRiskCategory", Key: "low", Value: "Low", NumericValue: 10, SortIndex: getSortIndex(), Description: `Regular business - package introduces no new concepts`},
		&models.Lookup{Type: "PackageRiskCategory", Key: "medium", Value: "Medium", NumericValue: 20, SortIndex: getSortIndex(), Description: `Regular business with tweaks - an altered flow or new concepts without a big impact`},
		&models.Lookup{Type: "PackageRiskCategory", Key: "high", Value: "High", NumericValue: 50, SortIndex: getSortIndex(), Description: `New business - specialization and/or customization`},
		&models.Lookup{Type: "PackageRiskCategory", Key: "unmatched", Value: "High", NumericValue: 100, SortIndex: getSortIndex(), Description: `Risky business - external factors can affect outcome`, Stamps: "explain"},
		&models.Lookup{Type: "PackageRiskCategory", Key: "zero", Value: "Zero", NumericValue: 0, SortIndex: getSortIndex(), Description: `Already working example - needs NO changes`},
		&models.Lookup{Type: "PackageRiskCategory", Key: "verylow", Value: "Very Low", NumericValue: 5, SortIndex: getSortIndex(), Description: `Already working example - needs very small changes`},
	}
	for i := 0; i < len(packageRiskCategoryLookups); i++ {
		db.Create(packageRiskCategoryLookups[i])
	}
	sortIndex = 0

	packageConceptStatusLookups := []*models.Lookup{
		&models.Lookup{Type: "PackageConceptStatus", Key: "definition", Value: "Definition", NumericValue: 0, SortIndex: getSortIndex(), Description: `During definition, tasks will be created and estimated`},
		&models.Lookup{Type: "PackageConceptStatus", Key: "ready", Value: "Ready", NumericValue: 0, SortIndex: getSortIndex(), Description: `Definition is complete and package can be offered`},
		&models.Lookup{Type: "PackageConceptStatus", Key: "offered", Value: "Offered", NumericValue: 0, SortIndex: getSortIndex(), Description: `Offered to the customer`},
		&models.Lookup{Type: "PackageConceptStatus", Key: "accepted", Value: "Accepted", NumericValue: 0, SortIndex: getSortIndex(), Description: `Package is accepted, task activity can start`},
		&models.Lookup{Type: "PackageConceptStatus", Key: "rejected", Value: "Rejected", NumericValue: 0, SortIndex: getSortIndex(), Description: `Package is rejected, to be revised or archived`},
		&models.Lookup{Type: "PackageConceptStatus", Key: "archived", Value: "Archived", NumericValue: 0, SortIndex: getSortIndex(), Description: `Package isn't active`},
	}
	for i := 0; i < len(packageConceptStatusLookups); i++ {
		db.Create(packageConceptStatusLookups[i])
	}
	sortIndex = 0

	taskStatusLookups := []*models.Lookup{
		&models.Lookup{Type: "TaskStatus", Key: "definition", Value: "Definition", NumericValue: 0, SortIndex: getSortIndex(), Description: `The definition of the task can still change`},
		&models.Lookup{Type: "TaskStatus", Key: "estimation", Value: "Estimation", NumericValue: 0, SortIndex: getSortIndex(), Description: `The estimation of the effort can change`},
		&models.Lookup{Type: "TaskStatus", Key: "defined", Value: "Defined", NumericValue: 0, SortIndex: getSortIndex(), Description: `Task definition and estimation are complete`},
		&models.Lookup{Type: "TaskStatus", Key: "released", Value: "Released", NumericValue: 0, SortIndex: getSortIndex(), Description: `Task activity can start`},
		&models.Lookup{Type: "TaskStatus", Key: "inprogress", Value: "In Progress", NumericValue: 0, SortIndex: getSortIndex(), Description: `Task activity has started`},
		&models.Lookup{Type: "TaskStatus", Key: "paused", Value: "Paused", NumericValue: 0, SortIndex: getSortIndex(), Description: `Task activity has paused`},
		&models.Lookup{Type: "TaskStatus", Key: "complete", Value: "Complete", NumericValue: 0, SortIndex: getSortIndex(), Description: `Task is delivered`},
		&models.Lookup{Type: "TaskStatus", Key: "cancelled", Value: "Cancelled", NumericValue: 0, SortIndex: getSortIndex(), Description: `Task is no more relevant`},
		&models.Lookup{Type: "TaskStatus", Key: "failed", Value: "Failed", NumericValue: 0, SortIndex: getSortIndex(), Description: `Task can't be delivered`},
	}
	for i := 0; i < len(taskStatusLookups); i++ {
		db.Create(taskStatusLookups[i])
	}
	sortIndex = 0

	taskCategoryLookups := []*models.Lookup{
		&models.Lookup{Type: "TaskCategory", Key: "development", Value: "Development", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "deployment", Value: "Deployment", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "maintenance", Value: "Maintenance", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "support", Value: "Support", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "pm", Value: "Project Management", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "meeting", Value: "Project Meeting", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "consulting", Value: "Consulting", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "research", Value: "Research", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "estimation", Value: "Estimation", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "conception", Value: "Conception", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "training", Value: "Training", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "internal", Value: "Internal", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "executive", Value: "Decision Making", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "vacation", Value: "Vacation", SortIndex: 0},
		&models.Lookup{Type: "TaskCategory", Key: "travel", Value: "Travel", SortIndex: 0},
	}
	for i := 0; i < len(taskCategoryLookups); i++ {
		db.Create(taskCategoryLookups[i])
	}
	sortIndex = 0

	taskPriorityLookups := []*models.Lookup{
		&models.Lookup{Type: "TaskPriority", Key: "normal", Value: "Normal", SortIndex: getSortIndex(), Description: `This task has standard impact and no significant dependant tasks`},
		&models.Lookup{Type: "TaskPriority", Key: "critical", Value: "Critical", SortIndex: getSortIndex(), Description: `This task blocks other tasks and/or business operations`},
		&models.Lookup{Type: "TaskPriority", Key: "high", Value: "High", SortIndex: getSortIndex(), Description: `Delivery of this task should be a high priority`},
		&models.Lookup{Type: "TaskPriority", Key: "low", Value: "Low", SortIndex: getSortIndex(), Description: `Task is totally separate from other work and has minimal impact`},
		&models.Lookup{Type: "TaskPriority", Key: "optional", Value: "Optional", SortIndex: getSortIndex(), Description: `There's no strict requirement to deliver this task`},
	}
	for i := 0; i < len(taskPriorityLookups); i++ {
		db.Create(taskPriorityLookups[i])
	}

	user := models.User{
		Domain:   "TestDomain",
		Name:     randomdata.FullName(randomdata.RandomGender),
		Email:    randomdata.Email(),
		Projects: []*models.Project{},
	}
	db.Create(&user)
	customers := make([]*models.Customer, 10)
	for i := 0; i < len(customers); i++ {
		customer := models.Customer{
			Name:     randomdata.SillyName(),
			LegacyId: fmt.Sprintf("LEGACY%v", randomdata.Number(1, 2000)),
		}
		db.Create(&customer)
		customers[i] = &customer
		time.Sleep(100)
	}
	fmt.Println("adding projects")
	for i := 0; i < 150; i++ {
		time.Sleep(10)
		fmt.Printf("Creating project struct %v\n", i)
		project := models.Project{
			Name:            randomdata.SillyName(),
			Description:     randomdata.Paragraph(),
			Manager:         &user,
			Users:           []*models.User{&user},
			Customer:        customers[rand.Intn(len(customers))],
			Tasks:           []*models.Task{},
			ProjectCategory: projectCategoryLookups[rand.Intn(len(projectCategoryLookups))],
		}
		fmt.Printf("Adding project %v\n", i)
		db.Create(&project)
		fmt.Printf("Created project %v\n", project.ID)
		for y := 0; y < randomdata.Number(2, 5); y++ {
			taskAmount := randomdata.Number(5, 10)
			tasks := make([]*models.Task, taskAmount)
			for z := 0; z < taskAmount; z++ {
				time.Sleep(10)
				task := models.Task{
					Name:         fmt.Sprintf("Task %v", z+1),
					Description:  randomdata.Paragraph(),
					AssignedTo:   &user,
					ProjectID:    project.ID,
					TaskCategory: taskCategoryLookups[rand.Intn(len(taskCategoryLookups))],
					TaskPriority: taskPriorityLookups[rand.Intn(len(taskPriorityLookups))],
					TaskStatus:   taskStatusLookups[rand.Intn(len(taskStatusLookups))],
				}
				tasks[z] = &task
			}
			projectPackage := &models.Package{
				Name:                 fmt.Sprintf("Package %v", y+1),
				Description:          randomdata.Paragraph(),
				StartsAt:             time.Now(),
				Tasks:                tasks,
				PackageCategory:      packageCategoryLookups[rand.Intn(len(packageCategoryLookups))],
				PackageRiskCategory:  packageRiskCategoryLookups[rand.Intn(len(packageRiskCategoryLookups))],
				PackageConceptStatus: packageConceptStatusLookups[rand.Intn(len(packageConceptStatusLookups))],
			}
			db.Create(&projectPackage)
			fmt.Printf("Created package %v\n", projectPackage.ID)
			project.Packages = append(project.Packages, projectPackage)
			project.Tasks = append(project.Tasks, tasks...)
		}
		db.Save(&project)
	}
}

// Returns a random part of a slice
func randomFrom(source []interface{}) interface{} {
	return source[rand.Intn(len(source))]
}
