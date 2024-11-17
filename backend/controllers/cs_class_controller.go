package controllers

import (
	"context"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetCSClass retrieves a CS class from the database using the class ID provided
// as a URL parameter. The function expects the :id parameter to be a valid MongoDB
// ObjectID. Returns a JSON response with the CS class if found, or an error
// message if the class is not found, the ID is invalid, or missing.
func GetCSClass(c *fiber.Ctx) error {
	class := new(models.CSClass)
	collection := db.GetCollection(class.TableName())

	id := c.Params("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid class ID",
		})
	}

	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "No class ID",
		})
	}

	err = collection.FindOne(context.Background(), bson.M{"_id": objectID}).Decode(class)

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Class not found",
		})
	}

	return c.JSON(class)
}

// CreateCSClass creates a new CS class in the database. It expects a JSON payload
// with the class's details. It returns a JSON response with the newly created
// class's _id, or a 400 error if there was a problem with the request body, or
// a 500 error if there was a problem creating the class.
func CreateCSClass(c *fiber.Ctx) error {
	class := new(models.CSClass)
	collection := db.GetCollection(class.TableName())

	if err := c.BodyParser(class); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	if class.Name == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Name is required",
		})
	}

	// Not needed?
	//if class.IsActive ==  {
	//	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	//		"message": "IsActive is required",
	//	})
	//}

	if class.Semester == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Semester is required",
		})
	}

	if class.Year == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Year is required",
		})
	}

	insertResult, err := collection.InsertOne(context.Background(), class)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create class" + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"id": insertResult.InsertedID,
	})
}

// CreateTAQueue creates a new TA queue in the database. It expects a JSON payload
// The JSON payload should include the TA's ID who initiated the queue.
// with the queue's details. It returns a JSON response with the newly created
// queue's _id, or a 500 error if there was a problem creating the queue.
func CreateTAQueue(c *fiber.Ctx) error {
	taQueue := new(models.TAQueue)
	collection := db.GetCollection(taQueue.TableName())
	if err := c.BodyParser(taQueue); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing request body: " + err.Error(),
		})
	}

	if taQueue.TAs == nil || len(taQueue.TAs) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Include TAs",
		})
	}

	insertResult, err := collection.InsertOne(context.Background(), taQueue)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create queue" + err.Error(),
		})
	}

	_, err = collection.UpdateOne(
		context.Background(),
		bson.M{"_id": taQueue.Class},
		bson.M{"$push": bson.M{"queues": taQueue}},
	)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update class" + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"id": insertResult.InsertedID,
	})
}

// GetActiveTAQueue retrieves the active TA queue from the database.
// The function queries the CSClass collection for a TA queue that is marked as active.
// It returns a JSON response with the active queue if found, or a 404 error
// with a message "Queue not found" if no active queue exists.
func GetActiveTAQueue(c *fiber.Ctx) error {
	class := new(models.CSClass)
	collection := db.GetCollection(class.TableName())
	var taQueue models.TAQueue
	err := collection.FindOne(context.Background(), bson.M{"isActive": true}).Decode(&taQueue)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Queue not found",
		})

	}
	return c.Status(fiber.StatusOK).JSON(taQueue)
}

func SetActive(c *fiber.Ctx) error {
	class := new(models.CSClass)
	collection := db.GetCollection(class.TableName())
	if err := c.BodyParser(class); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing request body: " + err.Error(),
		})
	}
	_, err := collection.UpdateOne(context.Background(), bson.M{"_id": class.ID}, bson.M{"$set": bson.M{"isActive": true}})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to set active" + err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Set active",
	})
}
