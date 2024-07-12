package util

import (
	"errors"
	"server/config"

	"github.com/golang-jwt/jwt"
)

var secretKey = []byte(config.GetConfig().JwtSecretKey)

func CreateToken(userId string, expUnix int64) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": userId,
		"exp":    expUnix,
	})
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return ""
	}

	return tokenString
}

func VerifyToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, errors.New("invalid JWT Token")
	}
}
