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

func (u *userUsecaseImpl) Register(m *models.RegisterUserData) (*entities.AuthUserResDto, error) {
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

	return u.generateTokens(createdUser.Id.Hex()), nil
}

func (u *userUsecaseImpl) Login(m *models.LoginUserData) (*entities.AuthUserResDto, error) {
	existingUser, err := u.userRepo.FindByUsername(m.Username)
	if err != nil {
		return nil, fmt.Errorf("failed to find user by username: %w", err)
	}

	if existingUser == nil || bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(m.Password)) != nil {
		return nil, errors.New("username or password is incorrect")
	}

	return u.generateTokens(existingUser.Id.Hex()), nil
}

func (u *userUsecaseImpl) GetProfile(userId string) (*entities.UserProfileResDto, error) {
	existingUser, err := u.userRepo.FindByUserId(userId)
	if err != nil {
		return nil, fmt.Errorf("failed to find user by user id: %w", err)
	}

	return &entities.UserProfileResDto{
		Id:       existingUser.Id.Hex(),
		Username: existingUser.Username,
	}, nil
}

func (u *userUsecaseImpl) Refresh(m *models.RefreshTokensData) (*entities.AuthUserResDto, error) {
	claims := util.VerifyToken(m.RefreshToken)

	userId, ok := claims["userId"].(string)
	if !ok {
		return nil, errors.New("failed to get user id")
	}

	existingUser, err := u.userRepo.FindByUserId(userId)
	if err != nil {
		return nil, fmt.Errorf("failed to find user by user id: %w", err)
	}

	return u.generateTokens(existingUser.Id.Hex()), nil
}

func (u *userUsecaseImpl) generateTokens(userId string) *entities.AuthUserResDto {
	accessToken := util.CreateToken(userId, time.Now().Add(time.Minute*15).Unix())   // 15 minutes
	refreshToken := util.CreateToken(userId, time.Now().Add(time.Hour*24*15).Unix()) // 15 days
	return &entities.AuthUserResDto{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}
}
