package repositories

import "server/user/entities"

type UserRepository interface {
	CreateUserData(c *entities.CreateUserDto) (*entities.User, error)
	FindByUsername(username string) (*entities.User, error)
}
