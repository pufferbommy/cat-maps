package server

import (
	"fmt"
	"server/config"
	"server/database"
	userHandlers "server/user/handlers"
	userRepositories "server/user/repositories"
	userUsecases "server/user/usecases"

	catHandlers "server/cat/handlers"
	catRepositories "server/cat/repositories"
	catUsecases "server/cat/usecases"

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
	e.app.Use(middleware.CORSWithConfig(middleware.CORSConfig{}))

	e.initializeUserHttpHandler()

	e.app.Logger.Fatal(e.app.Start(fmt.Sprintf(":%s", e.config.ServerPort)))
}

func (e *echoServer) initializeUserHttpHandler() {
	userRepository := userRepositories.NewUserMongoRepository(e.db)
	userUsecase := userUsecases.NewUserUsecaseImpl(userRepository)
	userHandler := userHandlers.NewUserHttpHandler(userUsecase)
	userGroup := e.app.Group("/api/v1/user")
	userGroup.POST("/register", userHandler.Register)
	userGroup.POST("/login", userHandler.Login)
	userGroup.GET("/profile", userHandler.GetProfile)
	userGroup.POST("/refresh", userHandler.Refresh)

	catRepository := catRepositories.NewCatMongoRepository(e.db)
	catUsecase := catUsecases.NewCatUsecaseImpl(catRepository, userRepository)
	catHandlers := catHandlers.NewCatHttpHandler(catUsecase)
	catGroup := e.app.Group("/api/v1/cat")
	catGroup.GET("", catHandlers.GetAll)
	catGroup.POST("", catHandlers.Add)
	catGroup.PATCH("/toggle-like", catHandlers.ToggleLike)
}
