package repositories

import (
	"context"
	"server/cat/entities"
	"server/config"
	"server/database"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type catMongoRepository struct {
	coll *mongo.Collection
}

func NewCatMongoRepository(db database.MongoDatabase) CatRepository {
	return &catMongoRepository{
		coll: db.GetDb().Database(config.GetConfig().DbName).Collection("cats"),
	}
}

func (r *catMongoRepository) GetAll() ([]entities.Cat, error) {
	filter := bson.M{}
	cursor, err := r.coll.Find(context.TODO(), filter)
	if err != nil {
		panic(err)
	}
	var results []entities.Cat
	cursor.All(context.TODO(), &results)

	return results, nil
}

func (r *catMongoRepository) Get(filter interface{}) (*entities.Cat, error) {
	result := new(entities.Cat)
	err := r.coll.FindOne(context.TODO(), filter).Decode(result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *catMongoRepository) Update(filter interface{}, update interface{}) error {
	err := r.coll.FindOneAndUpdate(context.TODO(), filter, update).Err()
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
	_, err := r.coll.InsertOne(context.TODO(), document)
	if err != nil {
		return err
	}
	return nil
}
