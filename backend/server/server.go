package server

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func ServerRun() {
	h := new(Handler)
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{AllowOrigins: []string{"https://cps-term-project-b.vercel.app/termProject/search"}, AllowMethods: []string{http.MethodGet}, AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept}}))
	e.GET("/health", h.Health)
	e.GET("/search", h.GetFeature)
	e.Logger.Fatal(e.Start(":8080"))
}
