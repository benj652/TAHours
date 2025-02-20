package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/benj-652/TAHours/middleware"
	"github.com/gofiber/fiber/v2"
)

func PostRoutes(app *fiber.App) {
	base := "/api/posts" //base route
	baseMiddleware := middleware.AuthMiddleware()
	// apply middleware to all routes
	postGroup := app.Group(base, baseMiddleware) 

	// Route to get a post. Make sure to protect to block students
	postGroup.Get("/all", controllers.GetAllPosts)

	/** Route to create a new post. Make sure to protect to block students
	* Requires a JSON body with the following fields:
	* - user (string): The user who created the post
	* - title (string): The title of the post
	* - body (string): The body of the post
	**/
	postGroup.Post("/create", controllers.CreatePost)

	/**
	 * Route to get a post. Requires an ID in the URL
	 * Make sure to protect to block students
	 * Requires a JSON body with the following fields:
	 * - user (string): The user who created the post
	 * - body (string): The body of the post
	 */
	postGroup.Post("/comment/:id", controllers.CreateComment)
	
	// Route to delete a post. Make sure to protect to make sure only 
	// admins and Professors can delete posts
	// Requires the ID of the post in the URL
	postGroup.Delete("/:id", controllers.DeletePost)
}
