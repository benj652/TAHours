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
	ticket := new(models.Ticket)

	collection := db.GetCollection(ticket.TableName())

	if err := c.BodyParser(ticket); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	if ticket.Problem == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Problem is required",
		})
	}

	if ticket.Description == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Description is required",
		})
	}

	// Possibly unnecessary
	if ticket.Student == primitive.NilObjectID {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Student is required",
		})
	}

	insertResult, err := collection.InsertOne(context.Background(), ticket)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create ticket" + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ticket created successfully",
		"id":      insertResult.InsertedID.(primitive.ObjectID).Hex(),
	})
}