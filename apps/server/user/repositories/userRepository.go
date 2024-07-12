package repositories

import (
	"server/user/entities"
)

type UserRepository interface {
	CreateUserData(c *entities.CreateUserReqDto) (*entities.CreateUserResDto, error)
	FindByUsername(username string) (*entities.User, error)
	FindByUserId(userId string) (*entities.User, error)
}
