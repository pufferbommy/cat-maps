package models

type RegisterUserData struct {
	Username        string `json:"username"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

type LoginUserData struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RefreshTokensData struct {
	RefreshToken string `json:"refreshToken"`
}
