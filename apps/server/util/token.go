package util

import (
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
