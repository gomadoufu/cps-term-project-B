package server

import (
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func ServerRun() {
	h := new(Handler)
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{AllowOrigins: []string{os.Getenv("CLIENT_URL")}, AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept}, AllowCredentials: true,
		MaxAge: 43200}))
	e.GET("/search", h.GetFeature)
	e.GET("/health", h.Health)
	e.Logger.Fatal(e.Start(":8080"))
}
