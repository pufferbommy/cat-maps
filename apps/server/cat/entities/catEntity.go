package entities

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	CatDto struct {
		Id           primitive.ObjectID   `json:"id"`
		Latitude     float64              `json:"latitude"`
		Longitude    float64              `json:"longitude"`
		ImageUrl     string               `json:"imageUrl"`
		LikedByUsers []primitive.ObjectID `json:"likedByUsers"`
	}

	Cat struct {
		Id           primitive.ObjectID   `bson:"_id,omitempty"`
		Latitude     float64              `bson:"latitude"`
		Longitude    float64              `bson:"longitude"`
		ImageUrl     string               `bson:"imageUrl"`
		Uploader     primitive.ObjectID   `bson:"uploader"`
		LikedByUsers []primitive.ObjectID `bson:"likedByUsers"`
		CreatedAt    time.Time            `bson:"createdAt"`
	}
)
