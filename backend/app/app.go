package app

import "github.com/gofiber/fiber/v2"

func Init() {
	// Initialize the application here and routes
	app := fiber.New()
	app.Listen(":3000")
}
