package handlers

import (
	"net/http"
	"server/user/models"
	"server/user/usecases"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type userHttpHandler struct {
	UserUsecase usecases.UserUsecase
}

func NewUserHttpHandler(userUsecase usecases.UserUsecase) UserHandler {
	return &userHttpHandler{
		UserUsecase: userUsecase,
	}
}

func (h userHttpHandler) Register(c echo.Context) error {
	reqBody := new(models.RegisterUserData)

	if err := c.Bind(reqBody); err != nil {
		log.Errorf("Error binding request body: %v", err)
		return response(c, http.StatusInternalServerError, "bad request", nil)
	}

	res, err := h.UserUsecase.Register(reqBody)
	if err != nil {
		return response(c, http.StatusInternalServerError, err.Error(), nil)
	}

	return response(c, http.StatusOK, "register success", *res)
}

func (h userHttpHandler) Login(c echo.Context) error {
	reqBody := new(models.LoginUserData)

	if err := c.Bind(reqBody); err != nil {
		log.Errorf("Error binding request body: %v", err)
		return response(c, http.StatusInternalServerError, "bad request", nil)
	}

	if err := h.UserUsecase.Login(reqBody); err != nil {
		return response(c, http.StatusInternalServerError, err.Error(), nil)
	}

	return response(c, http.StatusOK, "success", nil)
}
