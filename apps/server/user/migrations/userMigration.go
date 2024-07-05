package main

import (
	"server/config"
	"server/database"
	"server/user/entities"
)

func main() {
	config := config.GetConfig()
	db := database.NewPostgresDatabase(config)
	userMigrate(db)
}

func userMigrate(db database.Database) {
	db.GetDb().Migrator().CreateTable(&entities.User{})
}
