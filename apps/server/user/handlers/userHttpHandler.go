package handlers

import (
	"net/http"
	"server/user/models"
	"server/user/usecases"
	"strings"

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
		return response(c, http.StatusBadRequest, "bad request", nil)
	}

	res, err := h.UserUsecase.Register(reqBody)
	if err != nil {
		return response(c, http.StatusInternalServerError, err.Error(), nil)
	}

	return response(c, http.StatusOK, "register success", res)
}

func (h userHttpHandler) Login(c echo.Context) error {
	reqBody := new(models.LoginUserData)

	if err := c.Bind(reqBody); err != nil {
		log.Errorf("Error binding request body: %v", err)
		return response(c, http.StatusBadRequest, "bad request", nil)
	}

	res, err := h.UserUsecase.Login(reqBody)
	if err != nil {
		return response(c, http.StatusInternalServerError, err.Error(), nil)
	}

	return response(c, http.StatusOK, "login success", res)
}

func (h userHttpHandler) GetProfile(c echo.Context) error {
	authorization := c.Request().Header.Get("Authorization")
	if authorization == "" {
		return response(c, http.StatusOK, "", nil)
	}

	token := strings.Split(authorization, "Bearer ")[1]
	if token == "" {
		return response(c, http.StatusOK, "", nil)
	}

	res, err := h.UserUsecase.GetProfile(token)
	if err != nil {
		if err.Error() == "Token is expired" {
			return response(c, http.StatusUnauthorized, "", nil)
		}
		return response(c, http.StatusInternalServerError, err.Error(), nil)
	}

	return response(c, http.StatusOK, "", res)
}

func (h userHttpHandler) Refresh(c echo.Context) error {
	reqBody := new(models.RefreshTokensData)

	if err := c.Bind(reqBody); err != nil {
		log.Errorf("Error binding request body: %v", err)
		return response(c, http.StatusBadRequest, "bad request", nil)
	}

	res, err := h.UserUsecase.Refresh(reqBody)
	if err != nil {
		return response(c, http.StatusInternalServerError, err.Error(), nil)
	}

	return response(c, http.StatusOK, "", res)
}
