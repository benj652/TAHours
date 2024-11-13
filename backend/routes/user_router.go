package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	app.Get("/get-user", controllers.GetUser)
	app.Post("/get-or-create-user", controllers.GetOrCreateUser)
	app.Post("/change-description", controllers.ChangeDescription)
}
