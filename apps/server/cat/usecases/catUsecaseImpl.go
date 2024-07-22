package usecases

import (
	"server/cat/entities"
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

func (u *catUsecaseImpl) GetAll(currentUserId string) ([]entities.CatDto, error) {
	cats, err := u.catRepository.GetAll()
	if err != nil {
		return nil, err
	}

	catDtos := []entities.CatDto{}

	for _, cat := range cats {
		catDto := entities.CatDto{
			Id:               cat.Id,
			Latitude:         cat.Latitude,
			Longitude:        cat.Longitude,
			Image:            cat.Image,
			TotalLikes:       len(cat.LikedByUsers),
			CurrentUserLiked: false,
		}
		for _, likedByUser := range cat.LikedByUsers {
			if currentUserId == likedByUser {
				catDto.CurrentUserLiked = true
				break
			}
		}
		catDtos = append(catDtos, catDto)
	}

	return catDtos, nil
}

func (u *catUsecaseImpl) ToggleLike(d *entities.ToggleLikeData) error {
	id, _ := primitive.ObjectIDFromHex(d.CatId)
	filter := bson.M{
		"_id": id,
	}
	cat, err := u.catRepository.Get(filter)
	if err != nil {
		return err
	}

	for i, likedByUser := range cat.LikedByUsers {
		if likedByUser == d.UserId {
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
			"likedByUsers": append([]string{d.UserId}, cat.LikedByUsers...),
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
