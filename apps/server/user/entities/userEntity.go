package entities

type (
	CreateUserDto struct {
		Username string
		Password string
	}

	RegisterUserResDto struct {
		AccessToken  string `json:"accessToken"`
		RefreshToken string `json:"refreshToken"`
	}

	User struct {
		Id       uint32
		Username string
		Password string
	}
)
