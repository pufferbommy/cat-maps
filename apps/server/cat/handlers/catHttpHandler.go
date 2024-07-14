package handlers

import (
	"net/http"
	"server/cat/usecases"

	"github.com/labstack/echo/v4"
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
