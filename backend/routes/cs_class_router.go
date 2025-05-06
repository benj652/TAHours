package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/benj-652/TAHours/middleware"
	"github.com/gofiber/fiber/v2"
)

func CSClassRoutes(app *fiber.App) {
	baseMiddleware := middleware.AuthMiddleware()
	userMiddleware := middleware.UserMiddleware()
	base := "/api/cs-class" //base route
	classGroup := app.Group(base, baseMiddleware)

	// Route to get a CS class. Requires an ID in the URL
	classGroup.Get("/one/:id", userMiddleware, controllers.GetCSClass)

	/**
	 * Route to create a new CS class
	 * Requires a JSON body with the following fields:
	 * - name (string): The name of the CS class
	 * - semester (string): The semester of the CS class
	 * - year (int): The year of the CS class
	 *
	 * Make sure to protect this route so that only professors and admins can use it
	 */
	classGroup.Post("/create", userMiddleware, controllers.CreateCSClass)

	/**
	 * Create a new TA queue for the class.
	 * Requires a JSON body with the following fields:
	 * - TAs ([]primitive.ObjectID) list including the TA who created the queue
	 * - Class (string) of the class of the queue
	 * - Directions (string) of the directions of the queue
	 */
	classGroup.Post("/create-ta-queue", userMiddleware, controllers.CreateTAQueue)

	/**
	 * Sets the active TA to !Active.
	 * Requires the ID of the class in the URL.
	 *
	 * Make sure to protect so that only professors, tas and admins can use it
	 */
	classGroup.Post("/set-active/:id", userMiddleware, controllers.SetActive)

	/**
	 * Gets all active classes
	 */
	classGroup.Get("/active-classes", controllers.GetActiveClasses)
}
