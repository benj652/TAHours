package app

import (
	"log"
	"os"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/routes"
	"github.com/gofiber/fiber/v2"
)

func Init() {
	// Initialize the application here and routes
	BACKEND_PORT := os.Getenv("BACKEND_PORT")
	db.ConnectToMongo()

	app := fiber.New()

	routes.UserRoutes(app)
	routes.TicketRoutes(app)

	log.Fatal(app.Listen(":" + BACKEND_PORT))

	defer db.DisconnectFromMongo()
}
