package database

import (
	"fmt"
	"server/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type postgresDatabase struct {
	Db *gorm.DB
}

func NewPostgresDatabase(config *config.Config) Database {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		config.DbHost,
		config.DbUser,
		config.DbPassword,
		config.DbDbname,
		config.DbPort,
		config.DbSslmode,
		config.DbTimezone)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database.")
	}
	fmt.Println("Connected to database.")
	return &postgresDatabase{
		Db: db,
	}
}

func (p *postgresDatabase) GetDb() *gorm.DB {
	return p.Db
}
