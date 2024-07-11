package main

import (
	"server/config"
	"server/database"
	"server/server"
)

func main() {
	config := config.GetConfig()
	db := database.NewMongoDatabase(config)
	server.NewEchoServer(config, db).Start()
}
