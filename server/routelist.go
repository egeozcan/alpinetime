package server

import (
	"alpinetime/server/routes"
	"github.com/gin-gonic/gin"
)

type RouteDef struct {
	Method    string
	Path      string
	Handler   func(*gin.Context)
	AuthLevel int
}

func RouteList() *[]*RouteDef {
	var res []*RouteDef

	res = append(res, &RouteDef{"GET", "/", routes.LoginPage, 0})
	res = append(res, &RouteDef{"POST", "/login", routes.Login("/app/projects"), 0})
	res = append(res, &RouteDef{"GET", "/register", routes.RegistrationPage, 0})
	res = append(res, &RouteDef{"POST", "/register", routes.Register("/app/projects"), 0})

	res = append(res, &RouteDef{"GET", "/logout", routes.Logout, 1})

	res = append(res, &RouteDef{"GET", "/test/*catchAll", routes.RunTests, 1})

	res = append(res, &RouteDef{"GET", "/app/customers", routes.ProtectedArea, 1})
	res = append(res, &RouteDef{"GET", "/app/customer/:customerID", routes.ProtectedArea, 1})
	res = append(res, &RouteDef{"GET", "/app/projects", routes.ProtectedArea, 1})
	res = append(res, &RouteDef{"GET", "/app/project/:projectID", routes.ProtectedArea, 1})
	res = append(res, &RouteDef{"GET", "/app/timeentries", routes.ProtectedArea, 1})

	res = append(res, &RouteDef{"GET", "/api/customers", routes.Customers, 1})
	res = append(res, &RouteDef{"GET", "/api/customer/:customerID", routes.Customer, 1})
	res = append(res, &RouteDef{"GET", "/api/projects", routes.Projects, 1})
	res = append(res, &RouteDef{"GET", "/api/project/:projectID", routes.Project, 1})
	res = append(res, &RouteDef{"GET", "/api/tasks", routes.Tasks, 1})
	res = append(res, &RouteDef{"GET", "/api/packages", routes.Packages, 1})
	res = append(res, &RouteDef{"GET", "/api/definitions", routes.Definitions, 1})
	res = append(res, &RouteDef{"GET", "/api/lookups", routes.Lookups, 1})
	res = append(res, &RouteDef{"GET", "/api/timeentries", routes.TimeEntries, 1})

	res = append(res, &RouteDef{"POST", "/api/packages", routes.AddPackage, 1})

	return &res
}
