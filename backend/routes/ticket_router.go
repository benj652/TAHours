package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/gofiber/fiber/v2"
)

func TicketRoutes(app *fiber.App) {
	base := "/api/ticket" //base route

	// Route to get a ticket Requires an ID in the URL
	app.Get(base+"/get/:id", controllers.GetTicket)

	/**
	 * Route to create a new ticket
	 * Requires a JSON body with the following fields:
	 * - problem (string): The problem of the ticket
	 * - description (string): The description of the ticket
	 * - studentId (primitive.ObjectID): The ID of the student who is having the problem
	**/
	app.Post(base+"/create/:id", controllers.CreateTicket)

	/**
	 * Route to resolve a ticket
	 * Requires an ticket ID in the URL and a JSON body with the following fields:
	 * - taId (primitive.ObjectID): The ID of the TA
	 * - taNote (string): The note from the TA
	 * Make sure to protect this route so that only TAs, professors and admins can use it
	**/
	app.Post(base+"/resolve/:id", controllers.ResolveTicket)

	/**
	 * Route to delete a ticket
	 * Make sure to protect this route so that the student who made the ticket can delete it
	**/
	app.Delete(base+"/delete/:id", controllers.DeleteTicket)

	/**
	 * Route for a user to get all their tickets they have sent
	 * Requires a ID entered in the params
	**/
	app.Get(base+"/get-user-tickets/:id", controllers.GetUserTickets)
}
