package entities

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	Cat struct {
		Id           primitive.ObjectID `bson:"_id,omitempty"`
		Latitude     float64            `bson:"latitude"`
		Longitude    float64            `bson:"longitude"`
		Image        string             `bson:"image"`
		Uploader     primitive.ObjectID `bson:"uploader"`
		LikedByUsers []string           `bson:"likedByUsers"`
		CreatedAt    time.Time          `bson:"createdAt"`
	}

	CatDto struct {
		Id               primitive.ObjectID `json:"id"`
		Latitude         float64            `json:"latitude"`
		Longitude        float64            `json:"longitude"`
		Image            string             `json:"image"`
		CurrentUserLiked bool               `json:"currentUserLiked"`
		TotalLikes       int                `json:"totalLikes"`
	}

	AddCatData struct {
		Latitude  float64
		Longitude float64
		Image     string
		Uploader  primitive.ObjectID
	}

	ToggleLikeData struct {
		CatId  string
		UserId string
	}
)
