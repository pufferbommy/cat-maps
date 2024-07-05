package config

import (
	"github.com/spf13/viper"
)

type Config struct {
	ServerPort   string `mapstructure:"SERVER_PORT"`
	DbHost       string `mapstructure:"DB_HOST"`
	DbUser       string `mapstructure:"DB_USER"`
	DbPassword   string `mapstructure:"DB_PASSWORD"`
	DbDbname     string `mapstructure:"DB_DBNAME"`
	DbPort       string `mapstructure:"DB_PORT"`
	DbSslmode    string `mapstructure:"DB_SSLMODE"`
	DbTimezone   string `mapstructure:"DB_TIMEZONE"`
	JwtSecretKey string `mapstructure:"JWT_SECRET_KEY"`
}

func GetConfig() *Config {
	config := new(Config)

	viper.SetConfigName("config")
	viper.SetConfigType("env")
	viper.AddConfigPath("./")
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		panic(err.Error())
	}

	if err := viper.Unmarshal(&config); err != nil {
		panic(err.Error())
	}

	return config
}
