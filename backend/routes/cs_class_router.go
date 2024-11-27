package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/gofiber/fiber/v2"
)

func CSClassRoutes(app *fiber.App) {
	base := "/api/cs-class" //base route

	// Route to get a CS class. Requires an ID in the URL
	app.Get(base+"/get/:id", controllers.GetCSClass)

	/**
	 * Route to create a new CS class
	 * Requires a JSON body with the following fields:
	 * - name (string): The name of the CS class
	 * - semester (string): The semester of the CS class
	 * - year (int): The year of the CS class
	 *
	 * Make sure to protect this route so that only professors and admins can use it
	 */
	app.Post(base+"/create", controllers.CreateCSClass)

	/**
	 * Create a new TA queue for the class.
	 * Requires a JSON body with the following fields:
	 * - TAs ([]primitive.ObjectID) list including the TA who created the queue
	 * - Class (string) of the class of the queue
	 * - Directions (string) of the directions of the queue
	 */
	app.Post(base+"/create-ta-queue", controllers.CreateTAQueue)

	/**
	 * Sets the active TA to !Active.
	 * Requires the ID of the class in the URL.
	 *
	* Make sure to protext so that only professors, tas and admins can use it
	*/
	app.Post(base+"/set-active/:id", controllers.SetActive)

	/**
	 * Gets all active classes
	 */
	app.Get(base+"/get-active-classes", controllers.GetActiveClasses)
}
