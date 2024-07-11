package main

import (
	"server/config"
	"server/database"
)

func main() {
	config := config.GetConfig()
	db := database.NewMongoDatabase(config)
	userMigrate(db)
}

func userMigrate(db database.MongoDatabase) {

}
