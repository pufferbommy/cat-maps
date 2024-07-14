package handlers

import "github.com/labstack/echo/v4"

type baseResponse struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func response(c echo.Context, responseCode int, message string, data interface{}) error {
	return c.JSON(responseCode, &baseResponse{Message: message, Data: data})
}
