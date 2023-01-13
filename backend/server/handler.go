package server

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/gomadoufu/cps-term-project-B/backend/use_spotify"
)

type Handler struct {
	songFeature use_spotify.SongFeature
}

func (h *Handler) Health(c echo.Context) error {
	return c.JSON(http.StatusOK, use_spotify.SongFeature{SongName: "OK", Artist: []string{"OK"}, ImageURL: "OK", Danceability: 0.0, Energy: 0.0})
}

func (h *Handler) GetFeature(c echo.Context) error {
	song := c.QueryParam("song")
	h.songFeature.New(song)
	return c.JSON(http.StatusOK, h.songFeature)
}
