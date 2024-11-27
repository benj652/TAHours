package controllers

import (
	"context"
	"fmt"

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
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Class not found",
		})
	}

	return c.JSON(class)
}

// CreateCSClass creates a new CS class in the database. It expects a JSON payload
// with the class's details. It returns a JSON response with the newly created
// class's _id, or a 400 error if there was a problem with the request body, or
// a 500 error if there was a problem creating the class.
// Make sure only professors and admis can create classes in middleware
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

	class.Queues = []primitive.ObjectID{}
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
	if err := c.BodyParser(&taQueue); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing request body: " + err.Error(),
		})
	}

	if len(taQueue.TAs) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Include TAs",
		})
	}
	if taQueue.Class == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Include Class",
		})
	}
	if taQueue.Directions == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Include Directions",
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
	id := c.Params("id")
	classId, err := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": classId}
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid class ID",
		})
	}
	err = collection.FindOne(context.Background(), filter).Decode(&class)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Class not found",
		})
	}
	ids := class.Queues

	var queue models.TAQueue
	query := bson.M{"_id": bson.M{"$in": ids}, "isActive": true}
	queueCollection := db.GetCollection(queue.TableName())

	err = queueCollection.FindOne(context.Background(), query).Decode(&queue)

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Queue not found",
		})
	}
	return c.Status(fiber.StatusOK).JSON(queue)
}

func SetActive(c *fiber.Ctx) error {
	class := new(models.CSClass)
	id := c.Params("id")
	classId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid class ID",
		})
	}
	collection := db.GetCollection(class.TableName())
	// make this route able to set a class as not active

	filter := bson.M{"_id": classId}

	update := bson.M{"$set": bson.M{"isActive": bson.M{"$not": "$isActive"}}}
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to set active" + err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Set active",
	})
}

// GetActiveClasses retrieves all active classes from the database and returns them
// as a JSON response. An active class is a class that has at least one TA queue
// marked as active. If there are no active classes, the function returns an
// empty array and a 200 status code. If there is an error querying the
// database, the function returns a 500 error with an error message.
func GetActiveClasses(c *fiber.Ctx) error {
	classes := new([]models.CSClass)
	collection := db.GetCollection((&models.CSClass{}).TableName())

	cursor, err := collection.Find(context.Background(), bson.M{"isActive": true})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get active classes" + err.Error(),
		})
	}
	defer cursor.Close(context.Background())
	if err = cursor.All(context.Background(), classes); err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get active classes" + err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(classes)
}

// Aditional CRUD utility methods labeled CR

func CreateCSClassCR(name string, activeQueue primitive.ObjectID, queues []primitive.ObjectID, isActive bool, semester string, year int) error {
	collection := db.GetCollection((&models.CSClass{}).TableName())
	class := models.CSClass{
		Name:        name,
		ActiveQueue: activeQueue,
		Queues:      queues,
		IsActive:    isActive,
		Semester:    semester,
		Year:        year,
	}
	_, err := collection.InsertOne(context.Background(), class)
	return err
}

func GetCSClassCR(id primitive.ObjectID) (models.CSClass, error) {
	collection := db.GetCollection((&models.CSClass{}).TableName())
	var class models.CSClass
	filter := bson.M{"_id": id}
	err := collection.FindOne(context.Background(), filter).Decode(&class)
	return class, err
}

func UpdateCSClassCR(id primitive.ObjectID, name string, activeQueue primitive.ObjectID, queues []primitive.ObjectID, isActive bool, semester string, year int) error {
	collection := db.GetCollection((&models.CSClass{}).TableName())
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"name": name, "activeQueue": activeQueue, "queues": queues, "isActive": isActive, "semester": semester, "year": year}}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	return err
}

func DeleteCSClassCR(id primitive.ObjectID) error {
	collection := db.GetCollection((&models.CSClass{}).TableName())
	filter := bson.M{"_id": id}
	_, err := collection.DeleteOne(context.Background(), filter)
	return err
}
