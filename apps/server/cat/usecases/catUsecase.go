package usecases

import (
	"server/cat/entities"
	"server/cat/models"
)

type CatUsecase interface {
	GetAll() ([]entities.CatDto, error)
	ToggleLike(m *models.ToggleLikeData) error
}
