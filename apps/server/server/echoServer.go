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
	App    *echo.Echo
	Db     database.Database
	Config *config.Config
}

func NewEchoServer(config *config.Config, db database.Database) Server {
	app := echo.New()

	return &echoServer{
		App:    app,
		Db:     db,
		Config: config,
	}
}

func (e *echoServer) Start() {
	e.App.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.initializeUserHttpHandler()

	e.App.Logger.Fatal(e.App.Start(fmt.Sprintf(":%s", e.Config.ServerPort)))
}

func (e *echoServer) initializeUserHttpHandler() {
	userRepository := repositories.NewUserPostgresRepository(e.Db)
	userUsecase := usecases.NewUserUsecaseImpl(userRepository)
	userHttpHandler := handlers.NewUserHttpHandler(userUsecase)

	userGroup := e.App.Group("/api/v1/user")
	userGroup.POST("/register", userHttpHandler.Register)
	userGroup.POST("/login", userHttpHandler.Login)
}
