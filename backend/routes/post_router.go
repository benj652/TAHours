package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/gofiber/fiber/v2"
)

func PostRoutes(app *fiber.App) {
	app.Get("/post", controllers.GetAllPosts)
	app.Post("/post", controllers.CreatePost)
}
