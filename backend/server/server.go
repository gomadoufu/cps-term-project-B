package server

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func ServerRun() {
	h := new(Handler)
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"https://cps-term-project-b.onrender.com"},
		AllowMethods: []string{http.MethodGet},
	}))

	e.GET("/search", h.GetFeature)
	e.GET("/health", h.Health)
	e.Logger.Fatal(e.Start(":8080"))
}
