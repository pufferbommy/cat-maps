package handlers

import (
	"errors"
	"net/http"
	"server/cat/entities"
	"server/cat/models"
	"server/cat/usecases"
	"server/util"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type catHttpHandler struct {
	catUsecase usecases.CatUsecase
}

func NewCatHttpHandler(catUsecase usecases.CatUsecase) CatHandler {
	return &catHttpHandler{
		catUsecase: catUsecase,
	}
}

func (h *catHttpHandler) GetAll(c echo.Context) error {
	res, err := h.catUsecase.GetAll()
	if err != nil {
		return response(c, http.StatusInternalServerError, err.Error(), nil)
	}

	return response(c, http.StatusOK, "", res)
}

func (h *catHttpHandler) ToggleLike(c echo.Context) error {
	reqBody := new(models.ToggleLikeData)

	if err := c.Bind(reqBody); err != nil {
		log.Errorf("Error binding request body: %v", err)
		return response(c, http.StatusBadRequest, "bad request", nil)
	}

	token := strings.Split(c.Request().Header.Get("Authorization"), "Bearer ")[1]
	if token == "" {
		return response(c, http.StatusUnauthorized, "unauthorized", nil)
	}

	claims, err := util.VerifyToken(token)
	if err != nil {
		return err
	}

	userId, ok := claims["userId"].(string)
	if !ok {
		return errors.New("failed to get user id")
	}

	reqBody.UserId = userId

	toggleLikeErr := h.catUsecase.ToggleLike(reqBody)
	if toggleLikeErr != nil {
		return response(c, http.StatusInternalServerError, toggleLikeErr.Error(), nil)
	}
	return response(c, http.StatusOK, "toggle like success", nil)
}

func (h *catHttpHandler) Add(c echo.Context) error {
	reqBody := new(models.AddCatData)

	if err := c.Bind(reqBody); err != nil {
		log.Errorf("Error binding request body: %v", err)
		return response(c, http.StatusBadRequest, "bad request", nil)
	}

	token := strings.Split(c.Request().Header.Get("Authorization"), "Bearer ")[1]
	if token == "" {
		return response(c, http.StatusUnauthorized, "unauthorized", nil)
	}

	claims, err := util.VerifyToken(token)
	if err != nil {
		return err
	}

	userId, ok := claims["userId"].(string)
	if !ok {
		return errors.New("failed to get user id")
	}

	userObjectId, _ := primitive.ObjectIDFromHex(userId)

	data := &entities.AddCatData{
		Latitude:  reqBody.Latitude,
		Longitude: reqBody.Longitude,
		Image:     reqBody.Image,
		Uploader:  userObjectId,
	}

	addErr := h.catUsecase.Add(data)
	if addErr != nil {
		return response(c, http.StatusOK, addErr.Error(), nil)
	}

	return response(c, http.StatusOK, "cat uploaded", nil)
}
