package repositories

import (
	"errors"
	"server/database"
	"server/user/entities"

	"github.com/labstack/gommon/log"
	"gorm.io/gorm"
)

type userPostgresRepository struct {
	db database.Database
}

func NewUserPostgresRepository(db database.Database) UserRepository {
	return &userPostgresRepository{
		db: db,
	}
}

func (u *userPostgresRepository) CreateUserData(e *entities.CreateUserDto) (*entities.User, error) {
	user := &entities.User{
		Username: e.Username,
		Password: e.Password,
	}

	result := u.db.GetDb().Create(user)

	if result.Error != nil {
		log.Errorf("CreateUserData: %v", result.Error)
		return nil, result.Error
	}

	log.Debugf("CreateUserData: %v", result.RowsAffected)
	return user, nil
}

func (u *userPostgresRepository) FindByUsername(username string) (*entities.User, error) {
	var user = &entities.User{}
	result := u.db.GetDb().Where(&entities.User{Username: username}).First(user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		} else {
			panic(result.Error)
		}
	}
	return user, nil
}
