package app

import (
	"log"
	"os"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"github.com/benj-652/TAHours/socket"
)


func Init() {
	// Initialize the application
	BACKEND_PORT := os.Getenv("BACKEND_PORT")
	// MODE := os.Getenv("MODE")
	db.ConnectToMongo()

	// var wsConnection string
	wsConnection := "/ws"

	// if MODE == "production" {
	// 	wsConnection = "/wss"
	// } else {
	// 	wsConnection = "/ws"
	// }

	app := fiber.New(fiber.Config{
		BodyLimit: 32 * 1024 * 1024,
	})

	// Register HTTP routes
	routes.UserRoutes(app)
	routes.TicketRoutes(app)
	routes.TAQueueRoutes(app)
	routes.CSClassRoutes(app)
	routes.PostRoutes(app)

	// Register WebSocket route
	app.Use(wsConnection, websocket.New(socket.HandleWebSocket))

	log.Fatal(app.Listen(":" + BACKEND_PORT))

	defer db.DisconnectFromMongo()
}

