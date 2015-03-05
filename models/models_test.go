package models_test

import (
	"alpinetime/models"
	"encoding/json"
	//"fmt"
	"github.com/jinzhu/gorm"
	//"os"
	"github.com/stretchr/testify/assert"
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
	//var err error
	db, _ = models.InitDatabases(dbPath)
	// if _, statError := os.Stat(dbPath); statError == nil {
	// 	db, err = gorm.Open("sqlite3", dbPath)
	// } else {
	// }
	// if err != nil {
	// 	panic(fmt.Sprintf("No error should happen when migrating database, but got %+v", err))
	// }
	//db.LogMode(true)
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
	jsonResult, err := json.MarshalIndent(dbResult.Value, "", "  ")
	assert.Nil(t, err)
	t.Log(string(jsonResult))
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
	assert.NotNil(t, dbResult.Value)
	jsonResult, err := json.MarshalIndent(dbResult.Value, "", "  ")
	assert.Nil(t, err)
	t.Log(string(jsonResult))
	dbProject = dbResult.Value.(*models.Project)
	assert.NotNil(t, dbProject)
}

func TestCreatePackage(t *testing.T) {
	taskEstimation := models.Estimation{
		Comment:          "Test estimation",
		EstimatedMinutes: 365,
		Owner:            *dbUser,
	}
	packageTask := models.Task{
		ProjectID:   dbProject.ID,
		Name:        "Test Task1",
		Description: "Test description",
		AssignedTo:  *dbUser,
		Estimations: []models.Estimation{
			taskEstimation,
		},
		TechnicalStatus: models.TechnicalStatus{
			Name:        "Test t.status",
			Description: "Test t.descr",
		},
		ConceptStatus: models.ConceptStatus{
			Name:        "Test c.status",
			Description: "Test c.descr",
		},
	}
	packageCategory := models.Category{
		Name: "Test category",
	}
	projectPackage := models.Package{
		Name:        "TestPackage",
		Description: "This is a test package",
		StartsAt:    time.Now(),
		Category:    packageCategory,
		Tasks: []models.Task{
			packageTask,
		},
	}
	db.Create(&projectPackage)
	dbProject.Packages = append(dbProject.Packages, projectPackage)
	db.Save(dbProject)
	t.Log("Saved package")
}

func TestReadProject(t *testing.T) {
	queryProject := models.Project{
		Record: models.Record{ID: int64(1)},
	}
	dbResult := db.
		Preload("Packages").
		Preload("Customer").
		Preload("Manager").
		First(&queryProject)
	jsonResult, err := json.MarshalIndent(dbResult.Value, "", "  ")
	assert.Nil(t, err)
	t.Log(string(jsonResult))
}

func TestReadTasks(t *testing.T) {
	var tasks []models.Task
	queryTask := models.Task{
		ProjectID: int64(1),
	}
	dbTaskResult := db.
		Where(&queryTask).
		Preload("AssignedTo").
		Preload("Estimations").
		Preload("TechnicalStatus").
		Preload("ConceptStatus").
		Find(&tasks)
	jsonResult, err := json.MarshalIndent(dbTaskResult.Value, "", "  ")
	assert.Nil(t, err)
	t.Log(string(jsonResult))
}
