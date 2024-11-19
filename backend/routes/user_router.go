package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	base := "/api/user" //base route

	// Route to get or create a user. It creates a user if it doesn't exist. THis will be used when the user first logs in
	app.Post(base+"/get-or-create", controllers.GetOrCreateUser)

	/**
	* Route to Get a user, requires
	* - email (string): The email of the user
	**/
	app.Get(base+"/get", controllers.GetUser)

	/**
	* Route to update a user's description, requires the user ID in the URL and a JSON body with the following fields:
	* - description (string): and updated description of the user
	**/
	app.Post(base+"/update-description/:id", controllers.ChangeDescription)

	/**
	* Route to update user's profile pic
	**/
	app.Post(base+"/change-profile-pic/:id", controllers.ChangeProfilePic)

	/**
	* Route to update a user to a TA
	**/
	app.Post(base+"/update-role-ta/:id", controllers.UpdateRoleTA)

	/**
	* Route to update a user to a student
	**/
	app.Post(base+"/update-role-student/:id", controllers.UpdateRoleStudent)

	/**
	* Route to update a user to a professor
	**/
	app.Post(base+"/update-role-professor/:id", controllers.UpdateRoleProfessor)
}
