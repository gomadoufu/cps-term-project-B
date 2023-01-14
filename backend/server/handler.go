package server

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/gomadoufu/cps-term-project-B/backend/use_spotify"
)

type Handler struct {
	songFeature use_spotify.SongFeature
}

// Health is a health check endpoint /health
func (h *Handler) Health(c echo.Context) error {
	fmt.Println("Health Check request received")
	return c.JSON(http.StatusOK, use_spotify.SongFeature{SongName: "OK", Artist: []string{"OK"}, ImageURL: "OK", Danceability: 0.0, Energy: 0.0})
}

// GetFeature is a search endpoint /search
func (h *Handler) GetFeature(c echo.Context) error {
	fmt.Println("GetFeature request received")
	song := c.QueryParam("song")
	h.songFeature.New(song)
	return c.JSON(http.StatusOK, h.songFeature)
}
