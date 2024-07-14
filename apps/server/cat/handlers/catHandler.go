package handlers

import "github.com/labstack/echo/v4"

type CatHandler interface {
	GetAll(c echo.Context) error
}
