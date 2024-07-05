package usecases

import (
	"server/user/entities"
	"server/user/models"
)

type UserUsecase interface {
	Register(m *models.RegisterUserData) (*entities.RegisterUserResDto, error)
	Login(m *models.LoginUserData) error
}
