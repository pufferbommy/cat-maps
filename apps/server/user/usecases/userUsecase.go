package usecases

import (
	"server/user/entities"
	"server/user/models"
)

type UserUsecase interface {
	Register(m *models.RegisterUserData) (*entities.AuthUserResDto, error)
	Login(m *models.LoginUserData) (*entities.AuthUserResDto, error)
}
