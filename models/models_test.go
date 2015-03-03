package models_test

import (
	"alpinetime/models"
	"fmt"
	"github.com/jinzhu/gorm"
	"os"
	"testing"
	"time"
)

var (
	dbPath    = "./alpinetime_test.sqlite"
	db        gorm.DB
	dbUser    *models.User
	dbProject *models.Project
)

func init() {
	var err error
	if _, statError := os.Stat(dbPath); statError == nil {
		db, err = gorm.Open("sqlite3", dbPath)
	} else {
		db, err = models.InitDatabases(dbPath)
	}
	if err != nil {
		panic(fmt.Sprintf("No error should happen when migrating database, but got %+v", err))
	}
}

func TestCreateUser(t *testing.T) {
	user := models.User{
		Domain:   "TestDomain",
		Name:     "jinzhu",
		Email:    "test@example.com",
		Projects: []models.Project{},
	}
	db.Create(&user)
	dbResult := db.First(&user)
	if dbResult.Value == nil {
		panic("User should be saved to the database, but got nil")
	}
	t.Logf("Saved and retrieved user successfully: %#v", dbResult.Value)
	dbUser = dbResult.Value.(*models.User)
}

func TestCreateProject(t *testing.T) {
	customer := models.Customer{
		Name:     "Test customer",
		LegacyId: "test legacyId",
	}
	project := models.Project{
		Name:        "Test project1",
		Description: "test descr1",
		Manager:     *dbUser,
		Users:       []models.User{*dbUser},
		Customer:    customer,
	}
	db.Create(&project)
	dbResult := db.First(&project)
	if dbResult.Value == nil {
		panic("Project should be saved to the database, but got nil")
	}
	t.Log("Saved and retrieved user successfully.")
	dbProject = dbResult.Value.(*models.Project)
}

func TestCreatePackage(t *testing.T) {
	packageTask := models.Task{
		Description: "Test description",
		AssignedTo:  *dbUser,
		Tags: []models.Tag{
			models.Tag{Name: "Test"},
		},
		Estimations: []models.Estimation{},
		TechnicalStatus: models.TechnicalStatus{
			Name:        "Test t.status",
			Description: "Test t.descr",
		},
		ConceptStatus: models.ConceptStatus{
			Name:        "Test c.status",
			Description: "Test c.descr",
		},
	}
	projectPackage := models.Package{
		Description: "This is a test package",
		StartsAt:    time.Now(),
		Category: models.Category{
			Name: "Test category",
		},
		Tasks: []models.Task{
			packageTask,
		},
	}
	db.Create(&packageTask)
	db.Create(&projectPackage)
	dbProject.Packages = append(dbProject.Packages, projectPackage)
	db.Save(dbProject)
	t.Log("Saved package")
}
