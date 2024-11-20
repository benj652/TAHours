package routes

import (
	"github.com/benj-652/TAHours/controllers"
	"github.com/gofiber/fiber/v2"
)

func TAQueueRoutes(app *fiber.App) {
	base := "/api/ta-queue" //base route

	// Route to get all TA queues. Make sure to protect to block students
	app.Get(base+"/all", controllers.GetAllTAQueues)

	/** Route to add a TA to a TA queue. Requires an the queue ID in the URL
	* Requeres a JSON body with the following fields:
	* - TAId (primitive.ObjectID): The ID of the TA to add
	* Make sure to protect to block students
	**/
	app.Post(base+"/add-ta/:id", controllers.AddTaToQueue)

	/** Route to remove a TA from a TA queue. Requires an the queue ID in the URL
	* Requeres a JSON body with the following fields:
	* - TAId (primitive.ObjectID): The ID of the TA to remove
	* - classId (primitive.ObjectID): The ID of the class of the queue
	* Make sure to protect to block students
	**/
	app.Post(base+"/remove-ta/:id", controllers.RemoveTaFromQueue)

	/** Route to get active tickets from the queue. Requires an the queue ID in the URL
	*
	* Returns all active tickets in the queue
	**/
	app.Get(base+"/active-tickets/:id", controllers.GetActiveTickets)
}
