package handlers

import "github.com/labstack/echo/v4"

type CatHandler interface {
	GetAll(c echo.Context) error
	ToggleLike(c echo.Context) error
	Add(c echo.Context) error
}
