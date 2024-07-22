package repositories

import (
	"server/cat/entities"
)

type CatRepository interface {
	GetAll() ([]entities.Cat, error)
	Get(filter interface{}) (*entities.Cat, error)
	Update(filter interface{}, update interface{}) error
	Add(data *entities.AddCatData) error
}
