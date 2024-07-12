package entities

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	Cat struct {
		Id        primitive.ObjectID `bson:"_id,omitempty"`
		Latitude  float32            `bson:"latitude"`
		Longitude float32            `bson:"longitude"`
		ImageUrl  string             `bson:"imageUrl"`
		Uploader  primitive.ObjectID `bson:"uploader"`
		CreatedAt time.Time          `bson:"createdAt"`
	}
)
