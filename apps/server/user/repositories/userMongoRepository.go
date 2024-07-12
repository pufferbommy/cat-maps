package repositories

import (
	"context"
	"errors"
	"server/database"
	"server/user/entities"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type userMongoRepository struct {
	db database.MongoDatabase
}

func NewUserMongoRepository(db database.MongoDatabase) UserRepository {
	return &userMongoRepository{
		db: db,
	}
}

func (u *userMongoRepository) CreateUserData(e *entities.CreateUserReqDto) (*entities.CreateUserResDto, error) {
	user := &entities.User{
		Username: e.Username,
		Password: e.Password,
	}

	result, err := u.db.GetDb().Database("catMaps").Collection("users").InsertOne(context.TODO(), user)
	if err != nil {
		return nil, err
	}

	id, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		return nil, err
	}

	return &entities.CreateUserResDto{Id: id}, nil
}

func (u *userMongoRepository) FindByUsername(username string) (*entities.User, error) {
	var user entities.User
	filter := bson.M{"username": username}

	err := u.db.GetDb().Database("catMaps").Collection("users").FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func (u *userMongoRepository) FindByUserId(userId string) (*entities.User, error) {
	var user entities.User
	objectId, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return nil, err
	}
	filter := bson.M{"_id": objectId}
	decodeErr := u.db.GetDb().Database("catMaps").Collection("users").FindOne(context.TODO(), filter).Decode(&user)
	if decodeErr != nil {
		if errors.Is(decodeErr, mongo.ErrNoDocuments) {
			return nil, nil
		}
		return nil, decodeErr
	}

	return &user, nil
}
