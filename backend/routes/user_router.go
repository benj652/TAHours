package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	base := "/api/user" //base route

	/** Route to get or create a user. It creates a user if it doesn't exist. THis will be used when the user first logs in
	* Requires a JSON body with the following fields:
	* - email (string): The email of the user
	* - accessToken (string): The access token of the user
	**/
	app.Post(base+"/get-or-create", controllers.GetOrCreateUser)

	/**
	* Route to Get a user, requires a JSON body with the following fields:
	* - accessToken (string): The access token of the user
	* - email (string): The email of the user
	**/
	app.Get(base+"/get", controllers.GetUser)

	/**
	* Route to update a user's description, requires the user ID in the URL and a JSON body with the following fields:
	* - description (string): and updated description of the user
	*
	* Make sure to protect in a way that a user can only update thier own description
	**/
	app.Post(base+"/update-description/:id", controllers.ChangeDescription)

	/**
	* Route to update user's profile pic
	* Requires the user ID in the URL and a JSON body with the following fields:
	* - profileUrl (string): The profile pic of the user
	*
	* Make sure to protect in a way that a user can only update thier own profile pic
	**/
	app.Post(base+"/change-profile-pic/:id", controllers.ChangeProfilePic)

	/**
	* Route to update a user to a TA
	* Requires the target user ID in the URL
	*
	* Make sure to protect in a way that only admins and professors can make students TAs, and make sure Professors can not make admins or other professors TAs
	**/
	app.Post(base+"/update-role-ta/:id", controllers.UpdateRoleTA)

	/**
	* Route to update a user to a student
	* Requires the target user ID in the URL
	*
	* Make sure to protect the route in a way that only admins and professors can make only TAs students
	**/
	app.Post(base+"/update-role-student/:id", controllers.UpdateRoleStudent)

	/**
	* Route to update a user to a professor
	* Requires the target user ID in the URL
	*
	* Make sure to protect the route in a way that only admins and professors can make people professors
	**/
	app.Post(base+"/update-role-professor/:id", controllers.UpdateRoleProfessor)
}
