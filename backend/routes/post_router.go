package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/gofiber/fiber/v2"
)

func PostRoutes(app *fiber.App) {
	base := "/api/posts" //base route

	// Route to get a post. Make sure to protect to block students
	app.Get(base+"/all", controllers.GetAllPosts)

	/** Route to create a new post. Make sure to protect to block students
	* Requires a JSON body with the following fields:
	* - user (string): The user who created the post
	* - title (string): The title of the post
	* - body (string): The body of the post
	**/
	app.Post(base+"/create", controllers.CreatePost)

	/**
	 * Route to get a post. Requires an ID in the URL
	 * Make sure to protect to block students
	 * Requires a JSON body with the following fields:
	 * - user (string): The user who created the post
	 * - body (string): The body of the post
	 */
	app.Get(base+"/comment/:id", controllers.CreateComment)
}
