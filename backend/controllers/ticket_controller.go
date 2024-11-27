package controllers

import (
	"context"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetTicket handles the GET /ticket/:id endpoint, returning a ticket by its ID.
//
// The endpoint expects the :id parameter to be a valid MongoDB ObjectID.
// If the ID is invalid, it returns a 400 error with a JSON object containing the message "Invalid ticket ID".
// If the ID is empty, it returns a 400 error with a JSON object containing the message "No ticket ID".
// If the ticket is not found, it returns a 404 error with a JSON object containing the message "Ticket not found".
// If the ticket is found, it returns the ticket as a JSON object.
func GetTicket(c *fiber.Ctx) error {
	ticket := new(models.Ticket)

	collection := db.GetCollection(ticket.TableName())

	id := c.Params("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid ticket ID",
		})
	}

	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "No ticket ID",
		})
	}

	err = collection.FindOne(context.Background(), bson.M{"_id": objectID}).Decode(ticket)

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Ticket not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(ticket)
}

// CreateTicket handles the POST /ticket endpoint, creating a new ticket in the database.
//
// The request body should contain a JSON object with the following fields:
//
// - Problem: a string describing the problem the student is having
// - Description: a string describing the problem in more detail
// - Student: the _id of the student who is having the problem
//
// The endpoint returns a JSON object with the following fields:
//
// - message: a string indicating the result of the request
// - id: the _id of the newly created ticket, as a hex string
func CreateTicket(c *fiber.Ctx) error {
	id := c.Params("id")
	queueId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid queue ID",
		})
	}

	ticket := new(models.Ticket)
	collection := db.GetCollection(ticket.TableName())

	// Parse the request body
	if err := c.BodyParser(ticket); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	// Validate the ticket
	if ticket.Problem == "" { // check if problem is empty
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Problem is required",
		})
	}

	if ticket.Description == "" { // check if description is empty
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Description is required",
		})
	}

	if ticket.Student == primitive.NilObjectID { // check if student is empty
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Student is required",
		})
	}
	insertResult, err := collection.InsertOne(context.Background(), ticket) // insert ticket

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create ticket" + err.Error(),
		})
	}

	queueCollection := db.GetCollection((&models.TAQueue{}).TableName()) // get queue collection

	queueToUpdate := bson.M{"_id": queueId}
	updateQuery := bson.M{"$push": bson.M{"tickets": insertResult.InsertedID.(primitive.ObjectID)}}

	_, err = queueCollection.UpdateOne(context.Background(), queueToUpdate, updateQuery)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update queue" + err.Error(),
		})
	}

	// // check if student already has ticket in queue depricated for now.
	// filter := bson.M{"isActive": true, "tickets": bson.M{"$elemMatch": bson.M{"studentId": ticket.Student}}}

	// var queue models.TAQueue
	// err := queueTickets.FindOne(context.Background(), filter).Decode(&queue) // find queue
	// if err != nil {
	// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
	// 		"message": "student already has ticket in queue",
	// 	})
	// }

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ticket created successfully",
		"id":      insertResult.InsertedID.(primitive.ObjectID).Hex(),
	})
}

type ResolveTicketBody struct {
	TaId   primitive.ObjectID `json:"taId"` //maybe change this in the final product so it is captured through  the JWT
	TaNote string             `json:"taNote"`
}

// ResolveTicket marks a ticket with the TA id and a note, signifying that the ticket has been resolved
// the request body should contain a JSON object with the following fields:
//
// - TaId: the _id of the TA who is resolving the ticket
// - TaNote: a string describing the resolution of the ticket
//
// The endpoint returns a JSON object with the following fields:
//
// - message: a string indicating the result of the request
func ResolveTicket(c *fiber.Ctx) error {
	ticketId := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(ticketId)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid ticket ID",
		})
	}

	body := new(ResolveTicketBody)
	if err := c.BodyParser(body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	if body.TaId == primitive.NilObjectID {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "TA ID is required",
		})
	}

	if body.TaNote == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "TA note is required",
		})
	}
	collection := db.GetCollection((&models.Ticket{}).TableName())

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"ta": body.TaId, "taNote": body.TaNote}}
	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to resolve ticket" + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ticket resolved successfully",
	})
}

// DeleteTicket deletes a ticket from the database
//
// The endpoint returns a JSON object with the following fields:
//
// - message: a string indicating the result of the request
func DeleteTicket(c *fiber.Ctx) error {
	ticketId := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(ticketId)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid ticket ID",
		})
	}

	collection := db.GetCollection((&models.Ticket{}).TableName())

	filter := bson.M{"_id": objectID}
	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to delete ticket" + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ticket deleted successfully",
	})
}

// GetUserTickets retrieves all tickets for a given user ID.
//
// The endpoint returns a JSON object with the following fields:
//
// - message: a string indicating the result of the request
// - data: an array of Ticket objects, each containing the ticket's details
func GetUserTickets(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid user ID",
		})
	}

	collection := db.GetCollection((&models.Ticket{}).TableName())

	filter := bson.M{"student": objectID}

	var tickets []models.Ticket
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get tickets" + err.Error(),
		})
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {
		var ticket models.Ticket
		err = cursor.Decode(&ticket)
		if err != nil {
			return err
		}
		tickets = append(tickets, ticket)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Tickets retrieved successfully",
		"data":    tickets,
	})
}

// Aditional CRUD utility methods labeled CR

func CreateTicketCR(
	date primitive.DateTime,
	student primitive.ObjectID,
	problem string,
	description string,
	ta primitive.ObjectID,
	taNote string,
	screenshots []string) error {
	collection := db.GetCollection((&models.Ticket{}).TableName())

	ticket := models.Ticket{
		Date:        date,
		Student:     student,
		Problem:     problem,
		Description: description,
		Ta:          ta,
		TaNote:      taNote,
		Screenshots: screenshots,
	}
	_, err := collection.InsertOne(context.Background(), ticket)
	return err
}

func GetTicketCR(id primitive.ObjectID) (models.Ticket, error) {
	collection := db.GetCollection((&models.Ticket{}).TableName())

	var ticket models.Ticket
	err := collection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&ticket)
	return ticket, err
}

func UpdateTicketCR(
	id primitive.ObjectID,
	date primitive.DateTime,
	student primitive.ObjectID,
	problem string,
	description string,
	ta primitive.ObjectID,
	taNote string,
	screenshots []string) error {
	collection := db.GetCollection((&models.Ticket{}).TableName())

	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"date": date, "student": student, "problem": problem, "description": description, "ta": ta, "taNote": taNote, "screenshots": screenshots}}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	return err
}

func DeleteTicketCR(id primitive.ObjectID) error {
	collection := db.GetCollection((&models.Ticket{}).TableName())

	filter := bson.M{"_id": id}
	_, err := collection.DeleteOne(context.Background(), filter)
	return err
}
