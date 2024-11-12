package controllers

import (
	"context"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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
