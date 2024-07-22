package usecases

import (
	"server/cat/entities"
	"server/cat/models"
	catRepositories "server/cat/repositories"
	userRepositories "server/user/repositories"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type catUsecaseImpl struct {
	catRepository  catRepositories.CatRepository
	userRepository userRepositories.UserRepository
}

func NewCatUsecaseImpl(catRepository catRepositories.CatRepository, userRepository userRepositories.UserRepository) CatUsecase {
	return &catUsecaseImpl{
		catRepository:  catRepository,
		userRepository: userRepository,
	}
}

func (u *catUsecaseImpl) GetAll() ([]entities.CatDto, error) {
	return u.catRepository.GetAll()
}

func (u *catUsecaseImpl) ToggleLike(m *models.ToggleLikeData) error {
	id, _ := primitive.ObjectIDFromHex(m.CatId)
	filter := bson.M{
		"_id": id,
	}
	cat, err := u.catRepository.Get(filter)
	if err != nil {
		return err
	}

	for i, likedByUser := range cat.LikedByUsers {
		if likedByUser == m.UserId {
			update := bson.M{
				"$set": bson.M{
					"likedByUsers": append(cat.LikedByUsers[:i], cat.LikedByUsers[i+1:]...),
				},
			}
			err := u.catRepository.Update(filter, update)
			if err != nil {
				return err
			}
			return nil
		}
	}
	update := bson.M{
		"$set": bson.M{
			"likedByUsers": append([]string{m.UserId}, cat.LikedByUsers...),
		},
	}
	updateErr := u.catRepository.Update(filter, update)
	if updateErr != nil {
		return updateErr
	}
	return nil
}

func (u *catUsecaseImpl) Add(data *entities.AddCatData) error {
	err := u.catRepository.Add(data)
	if err != nil {
		return err
	}
	return nil
}
