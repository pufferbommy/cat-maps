package config

import (
	"github.com/spf13/viper"
)

type Config struct {
	ServerPort   string `mapstructure:"SERVER_PORT"`
	DbUser       string `mapstructure:"DB_USER"`
	DbPassword   string `mapstructure:"DB_PASSWORD"`
	DbCluster    string `mapstructure:"DB_CLUSTER"`
	DbName       string `mapstructure:"DB_NAME"`
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
