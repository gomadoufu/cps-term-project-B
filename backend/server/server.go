package server

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func ServerRun() {
	h := new(Handler)
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{AllowOrigins: []string{"http://localhost:3000"}, AllowCredentials: true}))
	e.GET("/health", h.Health)
	e.GET("/search", h.GetFeature)
	e.Logger.Fatal(e.Start(":8080"))
}
