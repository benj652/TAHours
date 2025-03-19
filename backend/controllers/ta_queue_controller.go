package controllers

import (
	"context"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/models"
	"github.com/benj-652/TAHours/socket"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// GetAllTAQueues retrieves all TA queues from the database and returns them
// as a JSON response.
func GetAllTAQueues(c *fiber.Ctx) error {
	queues := new([]models.TAQueue)
	collection := db.GetCollection((&models.TAQueue{}).TableName())
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get queues" + err.Error(),
		})
	}
	defer cursor.Close(context.Background())
	err = cursor.All(context.Background(), queues)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get queues" + err.Error(),
		})
	}

	return c.JSON(queues)
}

// TODO: Move this to the class controller and make sure it adds a queue to the class

// CreateTAQueue creates a new TA queue in the database. It expects a JSON payload
// The JSON payload should include the TA's ID who initiated the queue.
// with the queue's details. It returns a JSON response with the newly created
// queue's _id, or a 500 error if there was a problem creating the queue.
// func CreateTAQueue(c *fiber.Ctx) error {
// 	taQueue := new(models.TAQueue)
// 	collection := db.GetCollection(taQueue.TableName())
// 	if err := c.BodyParser(taQueue); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "Error parsing request body: " + err.Error(),
// 		})
// 	}
// 	if taQueue.TAs == nil || len(taQueue.TAs) == 0 {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "Include TAs",
// 		})
// 	}
// 	insertResult, err := collection.InsertOne(context.Background(), taQueue)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"message": "Failed to create queue" + err.Error(),
// 		})
// 	}
// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"id": insertResult.InsertedID,
// 	})
// }

// This is insecure we can just get the taId from middleware
// type AddTaToQueueRequest struct {
// 	TaId primitive.ObjectID `json:"taId"`
// }

// AddTaToQueue adds a TA to an existing TA queue in the database.
// The function expects the queue's ID as a URL parameter and the TA's ID to add in the request body.
// It returns a JSON response with the queue's ID if the TA is successfully added,
// or an error message if there is a failure in parsing the request body or updating the database.
func AddTaToQueue(c *fiber.Ctx) error {
	id := c.Params("id")
	queueID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid queue ID",
		})
	}

	// Currently, we are storing the TA's ID in the queue model, however, this will result in an extra API call UPDATE: caching algorithm on the front end makes this fine
	// to get the TA's information to display on the queue. It might be smart to either store the entire TA objects
	// in the queue model, or maybe just the profile picture and name to display.
	// var taId AddTaToQueueRequest
	// if err := c.BodyParser(&taId); err != nil {
	// 	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	// 		"message": "Error parsing request body: " + err.Error(),
	// 	})
	// }
	var taQueue models.TAQueue
	filter := bson.M{"_id": queueID}
	collection := db.GetCollection(taQueue.TableName())

	taId := c.Locals(models.USER_ID_POST_PARAM)
	if taId == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "taId missing",
		})
	}

	userRole := c.Locals(models.USER_ROLE_PARAM)
	if userRole != "ta" && userRole != "professor" && userRole != "admin" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User not authorized",
		})
	}
	err = collection.FindOne(context.Background(), filter).Decode(&taQueue)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to add TA to queue" + err.Error(),
		})
	}

	for i := 0; i < len(taQueue.TAs); i++ {
		if taQueue.TAs[i] == taId {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "TA already in queue",
			})
		}
	}

	// Adds the TA to the queue. This means they are now shown as active and TAing
	_, err = collection.UpdateOne(context.Background(), filter, bson.M{"$push": bson.M{"tas": taId}})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to add TA to queue" + err.Error(),
		})
	}

	payload := map[string]interface{}{
		"taId":    taId,
		"queueId": queueID,
	}

	socket.BroadcastJSONToAll(models.TA_JOIN_QUEUE_EVENT, payload)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"id": taQueue,
	})
}

// RemoveTaRequest is a struct that represents the request body for removing a TA from a TA queue.
type RemoveTaRequest struct {
	// TAId    primitive.ObjectID `json:"taId"`
	ClassId primitive.ObjectID `json:"classId"`
}

// RemoveTaFromQueue removes a TA from an existing TA queue in the database.
// The function expects the queue's ID as a URL parameter.
// It returns a JSON response with the queue's ID if the TA is successfully removed,
// or an error message if there is a failure in parsing the request body or updating the database.
func RemoveTaFromQueue(c *fiber.Ctx) error {
	id := c.Params("id")
	queueID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid queue ID",
		})
	}
	var removeRequest RemoveTaRequest
	collection := db.GetCollection((&models.TAQueue{}).TableName())

	if err := c.BodyParser(&removeRequest); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing request body: " + err.Error(),
		})
	}

	// TaID := removeRequest.TAId
	TaID := c.Locals("UserID")
	var taQueue models.TAQueue
	filter := bson.M{"_id": queueID}
	// Queries the database to find the queue given from the request body
	err = collection.FindOne(context.Background(), filter).Decode(&taQueue)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to remove TA from queue" + err.Error(),
		})
	}
	if len(taQueue.TAs) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Queue is empty",
		})
	}
	// if !class.IsActive {
	// 	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	// 		"message": "Queue is inactive",
	// 	})
	// }

	// If there is only one TA in the queue, then the queue is now inactive
	isActive := true
	if len(taQueue.TAs) == 1 {
		isActive = false

		// Updates the class to have no active queue if the last TA is leaving
		classFilter := bson.M{"_id": removeRequest.ClassId}
		classCollection := db.GetCollection((&models.CSClass{}).TableName())
		_, err = classCollection.UpdateOne(context.Background(), classFilter, bson.M{"$set": bson.M{"activeQueue": primitive.NilObjectID}})
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Failed to update class" + err.Error(),
			})
		}
	}

	_, err = collection.UpdateOne(context.Background(), filter, bson.M{"$pull": bson.M{"tas": TaID}})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to remove TA from queue" + err.Error(),
		})
	}

	payload := map[string]interface{}{
		"taId":     TaID,
		"isActive": isActive,
		"queueID":  queueID,
	}
	socket.BroadcastJSONToAll(models.TA_LEAVE_QUEUE_EVENT, payload)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"id":       taQueue.ID,
		"isActive": isActive,
	})
}

// getActiveTickets returns a list of all active tickets within a specific queue. tickets are marked as active when they have no TA assigned
func GetActiveTickets(c *fiber.Ctx) error {
	id := c.Params("id")
	queueID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid queue ID",
		})
	}
	var taQueue models.TAQueue
	filter := bson.M{"_id": queueID}
	collection := db.GetCollection(taQueue.TableName())

	err = collection.FindOne(context.Background(), filter).Decode(&taQueue)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "queue not found" + err.Error(),
		})
	}

	ticketCollection := db.GetCollection((&models.Ticket{}).TableName())

	if len(taQueue.Tickets) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"tickets": make([]models.Ticket, 0),
		})
	}

	ticketsFilter := bson.M{"_id": bson.M{"$in": taQueue.Tickets}, "ta": primitive.NilObjectID}

	cursor, err := ticketCollection.Find(context.Background(), ticketsFilter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get active tickets" + err.Error(),
		})
	}
	defer cursor.Close(context.Background())

	defer func() {
		if cursor != nil {
			cursor.Close(context.Background())
		}
	}()

	tickets := new([]models.Ticket)
	if err = cursor.All(context.Background(), tickets); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get active tickets" + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"tickets": tickets,
	})
}

func GetClassTickets(c *fiber.Ctx) error {
	id := c.Params("id")
	classID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid class ID",
		})
	}
	var classQueue models.TAQueue
	filter := bson.M{"class": classID}
	collection := db.GetCollection(classQueue.TableName())

	cursor, err := collection.Find(context.Background(), filter)
	if err == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"tickets": make([]models.Ticket, 0),
		})
	}
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting queue from class | " + err.Error(),
		})
	}
	defer cursor.Close(context.Background())

	classQueues := new([]models.TAQueue)

	err = cursor.All(context.Background(), classQueues)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error getting queue from cursor | " + err.Error(),
		})
	}

	if len(*classQueues) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"tickets": make([]models.Ticket, 0),
		})
	}

	tickets := new([]models.Ticket)

	for _, queue := range *classQueues {
		for _, id := range queue.Tickets {
			var ticket models.Ticket
			ticketCollection := db.GetCollection((&models.Ticket{}).TableName())
			filter := bson.M{"_id": id}
			err = ticketCollection.FindOne(context.Background(), filter).Decode(&ticket)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"message": "Error getting ticket from cursor | " + err.Error(),
				})
			}
			*tickets = append(*tickets, ticket)
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"tickets": tickets,
	})
}

// Aditional CRUD utility methods labeled CR

// func CreateTAQueueCR(tas []primitive.ObjectID, isActive bool, class primitive.ObjectID, directions string, tickets []primitive.ObjectID) error {
// 	collection := db.GetCollection((&models.TAQueue{}).TableName())
// 	queue := models.TAQueue{
// 		TAs:        tas,
// 		IsActive:   isActive,
// 		Class:      class,
// 		Directions: directions,
// 		Tickets:    tickets,
// 	}
// 	_, err := collection.InsertOne(context.Background(), queue)
// 	return err
// }

// func GetTAQueueCR(id primitive.ObjectID) (models.TAQueue, error) {
// 	collection := db.GetCollection((&models.TAQueue{}).TableName())
// 	var queue models.TAQueue
// 	filter := bson.M{"_id": id}
// 	err := collection.FindOne(context.Background(), filter).Decode(&queue)
// 	return queue, err
// }

// func UpdateTAQueueCR(id primitive.ObjectID, tas []primitive.ObjectID, isActive bool, class string, directions string, tickets []primitive.ObjectID) error {
// 	collection := db.GetCollection((&models.TAQueue{}).TableName())
// 	filter := bson.M{"_id": id}
// 	update := bson.M{"$set": bson.M{"TAs": tas, "isActive": isActive, "class": class, "directions": directions, "tickets": tickets}}
// 	_, err := collection.UpdateOne(context.Background(), filter, update)
// 	return err
// }

// func DeleteTAQueueCR(id primitive.ObjectID) error {
// 	collection := db.GetCollection((&models.TAQueue{}).TableName())
// 	filter := bson.M{"_id": id}
// 	_, err := collection.DeleteOne(context.Background(), filter)
// 	return err
// }
