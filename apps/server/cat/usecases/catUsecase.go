package usecases

import "server/cat/entities"

type CatUsecase interface {
	GetAll() ([]entities.CatDto, error)
}
