package usecases

import (
	"server/cat/entities"
	"server/cat/repositories"
)

type catUsecaseImpl struct {
	catRepository repositories.CatRepository
}

func NewCatUsecaseImpl(catRepository repositories.CatRepository) CatUsecase {
	return &catUsecaseImpl{
		catRepository: catRepository,
	}
}

func (u *catUsecaseImpl) GetAll() ([]entities.CatDto, error) {
	return u.catRepository.GetAll()
}
