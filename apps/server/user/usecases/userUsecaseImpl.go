package usecases

import (
	"errors"
	"fmt"
	"server/user/entities"
	"server/user/models"
	"server/user/repositories"
	"server/util"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type userUsecaseImpl struct {
	userRepo repositories.UserRepository
}

func NewUserUsecaseImpl(userRepo repositories.UserRepository) UserUsecase {
	return &userUsecaseImpl{
		userRepo: userRepo,
	}
}

func (u *userUsecaseImpl) Register(m *models.RegisterUserData) (*entities.RegisterUserResDto, error) {
	existingUser, err := u.userRepo.FindByUsername(m.Username)

	if err != nil {
		return nil, fmt.Errorf("failed to find user by username: %w", err)
	}
	if existingUser != nil {
		return nil, fmt.Errorf("username %s already exists", m.Username)
	}

	if m.Password != m.ConfirmPassword {
		return nil, errors.New("password and confirm password don't match")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(m.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	createUserData := &entities.CreateUserReqDto{
		Username: m.Username,
		Password: string(hashedPassword),
	}

	createdUser, err := u.userRepo.CreateUserData(createUserData)
	if err != nil {
		return nil, fmt.Errorf("failed to insert user data: %w", err)
	}

	createdUserId := createdUser.Id.String()

	accessToken := util.CreateToken(createdUserId, time.Now().Add(time.Hour*1).Unix())        // 1 hour
	refreshToken := util.CreateToken(createdUserId, time.Now().Add(time.Hour*1*24*15).Unix()) // 15 days

	return &entities.RegisterUserResDto{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (u *userUsecaseImpl) Login(m *models.LoginUserData) error {
	existingUser, err := u.userRepo.FindByUsername(m.Username)
	if err != nil {
		return fmt.Errorf("failed to find user by username: %w", err)
	}
	if existingUser == nil {
		return errors.New("username or password is incorrect")
	}

	hashedPassword := []byte(existingUser.Password)
	password := []byte(m.Password)
	if err := bcrypt.CompareHashAndPassword(hashedPassword, password); err != nil {
		return errors.New("username or password is incorrect")
	}

	return nil
}
