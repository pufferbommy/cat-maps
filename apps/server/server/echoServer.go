package server

import (
	"fmt"
	"server/config"
	"server/database"
	"server/user/handlers"
	"server/user/repositories"
	"server/user/usecases"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type echoServer struct {
	app    *echo.Echo
	db     database.MongoDatabase
	config *config.Config
}

func NewEchoServer(config *config.Config, db database.MongoDatabase) Server {
	app := echo.New()

	return &echoServer{
		app:    app,
		db:     db,
		config: config,
	}
}

func (e *echoServer) Start() {
	e.app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.initializeUserHttpHandler()

	e.app.Logger.Fatal(e.app.Start(fmt.Sprintf(":%s", e.config.ServerPort)))
}

func (e *echoServer) initializeUserHttpHandler() {
	userRepository := repositories.NewUserMongoRepository(e.db)
	userUsecase := usecases.NewUserUsecaseImpl(userRepository)
	userHttpHandler := handlers.NewUserHttpHandler(userUsecase)

	userGroup := e.app.Group("/api/v1/user")
	userGroup.POST("/register", userHttpHandler.Register)
	userGroup.POST("/login", userHttpHandler.Login)
}
