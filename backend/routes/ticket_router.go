package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/gofiber/fiber/v2"
)

func TicketRoutes(app *fiber.App) {
	app.Get("/ticket/:id", controllers.GetTicket)
}
