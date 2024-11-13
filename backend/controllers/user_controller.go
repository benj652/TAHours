package controllers

import (
	"context"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetOrCreateUser attempts to retrieve a user by email from the database
// using the Fiber context. If the user does not exist, it creates a new user.
// The function expects a user JSON payload in the request body.
// Returns a JSON response with the found or newly created user.
// If the email is missing in the request, it returns a 400 Bad Request error.
// If there's an error creating the user, it returns a 500 Internal Server Error.
func GetOrCreateUser(c *fiber.Ctx) error {
	user := new(models.User)
	collection := db.GetCollection(user.TableName())

	if err := c.BodyParser(user); err != nil {
		return err
	}

	if user.Email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Email is required",
		})
	}

	filter := bson.M{"email": user.Email}
	// update := bson.M{ "$setOnInsert": user}

	// this is bad code. Should use FindOneAndUpdate with setOn insert to avoid double error checking. Fix later.
	var foundUser models.User
	err := collection.FindOne(context.Background(), filter).Decode(&foundUser)
	if err != nil {
		insertResult, err := collection.InsertOne(context.Background(), user)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Failed to create user" + err.Error(),
			})
		}
		user.ID = insertResult.InsertedID.(primitive.ObjectID)
		foundUser = *user
	}

	return c.Status(fiber.StatusOK).JSON(foundUser)
}

// GetUser retrieves a user from the database using the email provided in the request body.
// The function expects a user JSON payload in the request body.
// Returns a JSON response with the found user.
// If the email is missing in the request, it returns a 400 Bad Request error.
// If the user is not found, it returns a 400 Bad Request error with a message.
func GetUser(c *fiber.Ctx) error {
	user := new(models.User)

	collection := db.GetCollection(user.TableName())

	if err := c.BodyParser(user); err != nil {
		return err
	}

	if user.Email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Email is required",
		})
	}

	filter := bson.M{"email": user.Email}
	// update := bson.M{ "$setOnInsert": user}
	var foundUser models.User
	err := collection.FindOne(context.Background(), filter).Decode(&foundUser)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(foundUser)
}

// ChangeDescription updates a user's description in the database using the user ID and description provided in the request body.
// The function expects the user ID as a parameter and a user JSON payload in the request body.
// The description is the only field that gets updated.
// Returns a JSON response with a success message.
// If the ID is missing in the request, it returns a 400 Bad Request error.
// If the user is not found, it returns a 400 Bad Request error with a message.
// If the update fails, it returns a 500 Internal Server error with a message.
func ChangeDescription(c *fiber.Ctx) error {
	var user models.User
	collection := db.GetCollection(user.TableName())

	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	filter := bson.M{"_id": objectID}

	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ID is required",
		})
	}

	update := bson.M{"$set": bson.M{"description": user.Description}}

	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update user",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User updated successfully",
	})
}
