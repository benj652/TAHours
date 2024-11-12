package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	app.Get("/user", controllers.GetUser)
}
