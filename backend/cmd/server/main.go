package main

import (
	"log"

	"github.com/benj-652/TAHours/app"
	"github.com/joho/godotenv"
	"github.com/benj-652/TAHours/utils"
)
func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("(Ignore in production) Error loading .env file", err)
	}
	secretPath := "/run/secrets/backend_env" // Adjust this path based on your Docker setup
	if err := utils.LoadEnvFromSecret(secretPath); err != nil {
		log.Println("(Ignore in production) Error loading secret: ", err)
	}
	app.Init()
}
