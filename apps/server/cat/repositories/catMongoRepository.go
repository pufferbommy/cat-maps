package repositories

import (
	"context"
	"log"
	"server/cat/entities"
	"server/database"

	"go.mongodb.org/mongo-driver/bson"
)

type catMongoRepository struct {
	db database.MongoDatabase
}

func NewCatMongoRepository(db database.MongoDatabase) CatRepository {
	return &catMongoRepository{
		db: db,
	}
}

func (r *catMongoRepository) GetAll() ([]entities.CatDto, error) {
	filter := bson.M{}
	cursor, err := r.db.GetDb().Database("catMaps").Collection("cats").Find(context.TODO(), filter)
	if err != nil {
		panic(err)
	}
	var results []entities.CatDto
	for cursor.Next(context.TODO()) {
		var result entities.Cat
		if err = cursor.Decode(&result); err != nil {
			log.Fatal(err)
		}

		results = append(results, entities.CatDto{
			Id:           result.Id,
			Latitude:     result.Latitude,
			Longitude:    result.Longitude,
			ImageUrl:     result.ImageUrl,
			LikedByUsers: result.LikedByUsers,
		})
	}
	return results, nil
}
