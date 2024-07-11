package repositories

import (
	"context"
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

	cratedUser, err := u.db.GetDb().Database("catMaps").Collection("users").InsertOne(context.TODO(), user)

	if err != nil {
		return nil, err
	}

	return &entities.CreateUserResDto{Id: cratedUser.InsertedID.(primitive.ObjectID)}, nil
}

func (u *userMongoRepository) FindByUsername(username string) (*entities.User, error) {
	user := &entities.User{}
	err := u.db.GetDb().Database("catMaps").Collection("users").FindOne(
		context.TODO(),
		bson.D{{"username", username}},
	).Decode(user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		panic(err)
	}

	return user, nil
}
