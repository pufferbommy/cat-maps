package handlers

import (
	"net/http"
	"server/cat/entities"
	"server/cat/models"
	"server/cat/usecases"

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
	res, err := h.catUsecase.GetAll(c.Get("userId").(string))
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

	data := &entities.ToggleLikeData{
		CatId:  reqBody.CatId,
		UserId: c.Get("userId").(string),
	}

	toggleLikeErr := h.catUsecase.ToggleLike(data)
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

	userObjectId, _ := primitive.ObjectIDFromHex(c.Get("userId").(string))

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
