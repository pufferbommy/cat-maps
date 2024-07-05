package handlers

import "github.com/labstack/echo/v4"

type UserHandler interface {
	Register(c echo.Context) error
	Login(c echo.Context) error
}
