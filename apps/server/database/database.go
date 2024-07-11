package database

import (
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoDatabase interface {
	GetDb() *mongo.Client
}
