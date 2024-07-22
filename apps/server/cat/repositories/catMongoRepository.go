package repositories

import (
	"context"
	"log"
	"server/cat/entities"
	"server/database"
	"time"

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
			Image:        result.Image,
			LikedByUsers: result.LikedByUsers,
		})
	}
	return results, nil
}

func (r *catMongoRepository) Get(filter interface{}) (*entities.Cat, error) {
	result := new(entities.Cat)
	err := r.db.GetDb().Database("catMaps").Collection("cats").FindOne(context.TODO(), filter).Decode(result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *catMongoRepository) Update(filter interface{}, update interface{}) error {
	err := r.db.GetDb().Database("catMaps").Collection("cats").FindOneAndUpdate(context.TODO(), filter, update).Err()
	if err != nil {
		return err
	}
	return nil
}

func (r *catMongoRepository) Add(data *entities.AddCatData) error {
	document := entities.Cat{
		Latitude:     data.Latitude,
		Longitude:    data.Longitude,
		Image:        data.Image,
		Uploader:     data.Uploader,
		LikedByUsers: []string{},
		CreatedAt:    time.Now(),
	}
	_, err := r.db.GetDb().Database("catMaps").Collection("cats").InsertOne(context.TODO(), document)
	if err != nil {
		return err
	}
	return nil
}
