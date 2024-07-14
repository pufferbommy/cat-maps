package repositories

import "server/cat/entities"

type CatRepository interface {
	GetAll() ([]entities.CatDto, error)
}
