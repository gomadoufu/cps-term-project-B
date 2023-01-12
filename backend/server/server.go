package server

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func ServerRun() {
	h := new(Handler)
	e := echo.New()
	e.Use(middleware.Logger())
	e.GET("/health", h.Health)
	e.GET("/feature", h.GetFeature)
	e.Logger.Fatal(e.Start(":8080"))
}
