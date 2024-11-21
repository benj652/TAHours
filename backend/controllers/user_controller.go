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

var roles = models.RolesConfig()

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
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing request body: " + err.Error(),
		})
	}

	if user.Email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Email is required",
		})
	}
	if user.AccessToken == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Access token is required",
		})
	}
	filter := bson.M{"email": user.Email}
	// update := bson.M{ "$setOnInsert": user}

	// this is bad code. Should use FindOneAndUpdate with setOn insert to avoid double error checking. Fix later.
	var foundUser models.User
	// fmt.Println("CHECK 1")
	err := collection.FindOne(context.Background(), filter).Decode(&foundUser)
	if err != nil {
		user.Roles = "student"
		user.ProfilePic = "https://robohash.org/" + user.Email + "?set=set4"
		// fmt.Println(user)
		// fmt.Println("CHECK 2")
		insertResult, err := collection.InsertOne(context.Background(), user)
		fmt.Println(err)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Failed to create user" + err.Error(),
			})
		}
		user.ID = insertResult.InsertedID.(primitive.ObjectID)
		foundUser = *user
	}
	// fmt.Println(foundUser)
	return c.Status(fiber.StatusOK).JSON(user)
}

// getUserBody represents the structure of the request body for the GetUser route
type GetUserBody = struct {
	AccessToken string `json:"accessToken"`
	Email       string `json:"email"`
}

// GetUser retrieves a user from the database using the email provided in the request body.
// The function expects a user JSON payload in the request body.
// Returns a JSON response with the found user.
// If the email is missing in the request, it returns a 400 Bad Request error.
// If the user is not found, it returns a 400 Bad Request error with a message.
func GetUser(c *fiber.Ctx) error {
	collection := db.GetCollection((&models.User{}).TableName())
	var curBody GetUserBody
	if err := c.BodyParser(&curBody); err != nil {
		println("here")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing request body: " + err.Error(),
		})
	}

	if curBody.Email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Email is required",
		})
	}

	if curBody.AccessToken == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Access token is required",
		})
	}

	filter := bson.M{"email": curBody.Email}
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

// NewDescription represents the structure of the request body for the ChangeDescription route
type NewDescription struct {
	Description string `json:"description"`
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

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid user ID",
		})
	}
	filter := bson.M{"_id": objectID}

	var description NewDescription
	if err := c.BodyParser(&description); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing request body: " + err.Error(),
		})
	}

	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ID is required",
		})
	}

	update := bson.M{"$set": bson.M{"description": description.Description}}

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

// ChangeProfilePic represents the structure of the request body for the ChangeProfilePic route
type ChangeProfilePicBody struct {
	NewProfilePic string `json:"profileUrl"`
}

// ChangeProfilePic updates a user's profile picture in the database using the user ID provided in the URL parameters
// and the profile picture URL in the request body. The function expects the user ID as a parameter and a string
// representing the new profile picture URL in the request body. Returns a JSON response with a success message.
// If the ID is missing or invalid, it returns an error. If the update fails, it returns a 500 Internal Server error
// with a message.
// This route should be protected with middleware to ensure you can not change other users' profile pictures.
func ChangeProfilePic(c *fiber.Ctx) error {
	id := c.Params("id")
	userID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return err
	}

	var profileUrl ChangeProfilePicBody

	if err := c.BodyParser(&profileUrl); err != nil {
		return err
	}

	filter := bson.M{"_id": userID}

	update := bson.M{"$set": bson.M{"profilePic": profileUrl.NewProfilePic}}

	collection := db.GetCollection((&models.User{}).TableName())

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

// UpdateRoleTA updates a user's role in the database using the user ID provided in the URL parameters
// and the new role in the request body. The function expects the user ID as a parameter and a string
// representing the new role in the request body. Returns a JSON response with a success message.
// If the ID is missing or invalid, it returns an error. If the update fails, it returns a 500 Internal Server error
// with a message.
// This route should be protected with middleware to ensure that only admin or professor can make TAs roles.
func UpdateRoleTA(c *fiber.Ctx) error {
	id := c.Params("id")
	userID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid ID",
		})
	}

	var role = roles.Ta

	filter := bson.M{"_id": userID}

	collection := db.GetCollection((&models.User{}).TableName())

	// gets the targeted user to ensure that that professors can not downgrade other professors
	var user models.User
	err = collection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	// more magic strings
	// makes sure that professors can not downgrade admins or other professors. Move this into middleware
	// if user.Roles == roles.Professor || user.Roles == roles.Admin {
	// 	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	// 		"message": "You do not have permission to update this user",
	// 	})
	// }
	update := bson.M{"$set": bson.M{"role": role}}

	_, err = collection.UpdateOne(context.Background(), filter, update) //update the role
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update user" + err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User updated successfully",
	})
}

// UpdateRoleStudent updates a user's role to student in the database.
// The function expects a user ID as a parameter and a user JSON payload in the request body.
// Returns a JSON response with a success message.
// If the ID is missing or invalid, it returns a 400 Bad Request error.
// If the update fails, it returns a 500 Internal Server error with a message.
// This route should be protected with middleware to ensure only professors and admins can change other users' role.
func UpdateRoleStudent(c *fiber.Ctx) error {
	id := c.Params("id")
	userID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid ID",
		})
	}

	filter := bson.M{"_id": userID}
	update := bson.M{"$set": bson.M{"role": roles}}

	collection := db.GetCollection((&models.User{}).TableName())

	var user models.User
	err = collection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User not found",
		})
	}
	// if user.Roles == roles.Professor || user.Roles == roles.Admin { // makes sure that professors can not downgrade admins or other professors Move this into middleware
	// 	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
	// 		"message": "You do not have permission to update this user",
	// 	})
	// }

	_, err = collection.UpdateOne(context.Background(), filter, update) //update the role
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update user" + err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User updated successfully",
	})
}

// UpdateRoleProfessor updates a user's role to professor in the database.
//
// The function takes an id parameter, which is the ObjectID of the user to be updated.
//
// The endpoint returns a JSON response with a success message.
// If the ID is missing in the request, it returns a 400 Bad Request error.
// If the user is not found, it returns a 400 Bad Request error with a message.
// If the update fails, it returns a 500 Internal Server error with a message.
// Make sure to protect the route so that only admins can use it
func UpdateRoleProfessor(c *fiber.Ctx) error {
	id := c.Params("id")
	userID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid ID",
		})
	}

	// magic string, fix later
	var role = roles.Professor

	filter := bson.M{"_id": userID}
	update := bson.M{"$set": bson.M{"role": role}}

	collection := db.GetCollection((&models.User{}).TableName())

	_, err = collection.UpdateOne(context.Background(), filter, update) //update the role
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update user",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User updated successfully",
	})
}
