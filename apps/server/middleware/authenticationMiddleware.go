package middleware

import (
	"server/util"
	"strings"

	"github.com/labstack/echo/v4"
)

func AuthenticationMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authorization := c.Request().Header.Get("Authorization")

		token := strings.TrimPrefix(authorization, "Bearer ")

		claims := util.VerifyToken(token)

		userId := ""

		if claims["userId"] != nil {
			userId = claims["userId"].(string)
		}

		c.Set("userId", userId)

		return next(c)
	}
}
