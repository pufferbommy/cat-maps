package entities

import "go.mongodb.org/mongo-driver/bson/primitive"

type (
	CreateUserReqDto struct {
		Username string
		Password string
	}

	CreateUserResDto struct {
		Id primitive.ObjectID
	}

	RegisterUserResDto struct {
		AccessToken  string `json:"accessToken"`
		RefreshToken string `json:"refreshToken"`
	}

	User struct {
		Id       primitive.ObjectID `bson:"_id,omitempty"`
		Username string             `bson:"username"`
		Password string             `bson:"password"`
	}
)
