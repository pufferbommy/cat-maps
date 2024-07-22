package usecases

import (
	"server/cat/entities"
)

type CatUsecase interface {
	GetAll(currentUserId string) ([]entities.CatDto, error)
	ToggleLike(e *entities.ToggleLikeData) error
	Add(e *entities.AddCatData) error
}
