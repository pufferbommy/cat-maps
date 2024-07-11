package database

import (
	"context"
	"fmt"
	"server/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type mongoDatabase struct {
	db *mongo.Client
}

func NewMongoDatabase(config *config.Config) MongoDatabase {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(fmt.Sprintf("mongodb+srv://%s:%s@%s/?retryWrites=true&w=majority&appName=Cluster0", config.DbUser, config.DbPassword, config.DbCluster)).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")

	return &mongoDatabase{
		db: client,
	}
}

func (m *mongoDatabase) GetDb() *mongo.Client {
	return m.db
}
