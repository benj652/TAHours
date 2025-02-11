package main

import (
	"log"

	"github.com/benj-652/TAHours/app"
	"github.com/joho/godotenv"
)
func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file", err)
	}
	app.Init()
}
