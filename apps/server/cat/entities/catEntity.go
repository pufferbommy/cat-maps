package entities

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	AddLikeData struct {
		CatId  string
		UserId string
	}

	CatDto struct {
		Id           primitive.ObjectID `json:"id"`
		Latitude     float64            `json:"latitude"`
		Longitude    float64            `json:"longitude"`
		Image        string             `json:"image"`
		LikedByUsers []string           `json:"likedByUsers"`
	}

	Cat struct {
		Id           primitive.ObjectID `bson:"_id,omitempty"`
		Latitude     float64            `bson:"latitude"`
		Longitude    float64            `bson:"longitude"`
		Image        string             `bson:"image"`
		Uploader     primitive.ObjectID `bson:"uploader"`
		LikedByUsers []string           `bson:"likedByUsers"`
		CreatedAt    time.Time          `bson:"createdAt"`
	}

	AddCatData struct {
		Latitude  float64
		Longitude float64
		Image     string
		Uploader  primitive.ObjectID
	}
)
