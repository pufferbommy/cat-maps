package usecases

import (
	"server/cat/entities"
	"server/cat/models"
)

type CatUsecase interface {
	GetAll() ([]entities.CatDto, error)
	ToggleLike(d *models.ToggleLikeData) error
	Add(d *entities.AddCatData) error
}
