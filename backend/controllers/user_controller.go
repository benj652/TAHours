package controllers

import (
	"context"
	"fmt"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var roles = models.RolesConfig()

// GetOrCreateUser attempts to retrieve a user by email from the database
// using the Fiber context. If the user does not exist, it creates a new user.
// The function expects a user JSON payload in the request body.
// Returns a JSON response with the found or newly created user.
// If the email is missing in the request, it returns a 400 Bad Request error.
// If there's an error creating the user, it returns a 500 Internal Server Error.
func GetOrCreateUser(c *fiber.Ctx) error {
	collection := db.GetCollection("users") // Ensure this matches your actual collection name

	// Extract user info from middleware
	email := c.Locals("Email")
	accessToken := c.Locals("AccessToken")
	firstName := c.Locals("FirstName")
	lastName := c.Locals("LastName")
	profilePic := c.Locals("profilePic")

	// Debugging: Print extracted data
	fmt.Println("Extracted from middleware - Email:", email)
	fmt.Println("Extracted from middleware - AccessToken:", accessToken)

	// Ensure email exists (shouldn't happen since middleware validates it)
	if email == nil || email == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized: Missing email in token",
		})
	}
	if accessToken == nil || accessToken == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized: Missing access token in token",
		})
	}

	// Check if user exists in the database
	filter := bson.M{"email": email}
	var foundUser models.User
	err := collection.FindOne(context.Background(), filter).Decode(&foundUser)

	if err == mongo.ErrNoDocuments {
		// User does not exist, create a new one
		newUser := models.User{
			ID:          primitive.NewObjectID(),
			Email:       email.(string),
			AccessToken: accessToken.(string),
			FirstName:   firstName.(string),
			LastName:    lastName.(string),
			ProfilePic:  profilePic.(string),
			Roles:       "student",
		}

		_, err := collection.InsertOne(context.Background(), newUser)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Failed to create user: " + err.Error(),
			})
		}

		foundUser = newUser
	}

	// Return the user (existing or newly created)
	return c.Status(fiber.StatusOK).JSON(foundUser)
}

// new Get user by ID
func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	userID, err := primitive.ObjectIDFromHex(id)

	user := models.User{}
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid ID",
		})
	}

	collection := db.GetCollection((&models.User{}).TableName())

	err = collection.FindOne(context.Background(), bson.M{"_id": userID}).Decode(&user)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(user)
}

//This method is not needed anymore WE need to get users by their ID. I do not think we will ever need to get them by thier email
// // getUserBody represents the structure of the request body for the GetUser route
// type GetUserBody = struct {
// 	Email       string `json:"email"`
// }

// // GetUser retrieves a user from the database using the email provided in the request body.
// // The function expects a user JSON payload in the request body.
// // Returns a JSON response with the found user.
// // If the email is missing in the request, it returns a 400 Bad Request error.
// // If the user is not found, it returns a 400 Bad Request error with a message.
// func GetUser(c *fiber.Ctx) error {
// 	collection := db.GetCollection((&models.User{}).TableName())
// 	var curBody GetUserBody
// 	if err := c.BodyParser(&curBody); err != nil {
// 		println("here")
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "Error parsing request body: " + err.Error(),
// 		})
// 	}

// 	if curBody.Email == "" {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "Email is required",
// 		})
// 	}

// 	// if curBody.AccessToken == "" {
// 	// 	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 	// 		"message": "Access token is required",
// 	// 	})
// 	// }

// 	filter := bson.M{"email": curBody.Email}
// 	// update := bson.M{ "$setOnInsert": user}
// 	var foundUser models.User
// 	err := collection.FindOne(context.Background(), filter).Decode(&foundUser)
// 	if err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "User not found",
// 		})
// 	}

// 	return c.Status(fiber.StatusOK).JSON(foundUser)
// }

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

	// Get user ID from URL params and from the locals
	id := c.Params("id")
	userId := c.Locals("UserID")

	// Ensure userId is a string, if not, return a bad request
	userIdPrim, ok := userId.(primitive.ObjectID)
	if !ok {
		// Handle the case where userId is not an ObjectID
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User ID is not a valid ObjectID",
		})
	}
	userIdStr := userIdPrim.Hex()
	print(userIdStr)
	print(id)

	// Ensure the ID from URL matches the userId (both should be strings)
	if id != userIdStr {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"err": "You do not have permission to update this user",
		})
	}

	// Convert the string ID to ObjectID for MongoDB query
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid user ID format",
		})
	}

	// Create the filter for MongoDB query
	filter := bson.M{"_id": objectID}

	// Parse the new description from the request body
	var description NewDescription
	if err := c.BodyParser(&description); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing request body: " + err.Error(),
		})
	}

	// Check if description is provided
	if description.Description == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Description is required",
		})
	}

	// Prepare the update operation
	update := bson.M{"$set": bson.M{"description": description.Description}}

	// Update the user in the database
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update user description",
		})
	}

	// Return a success response
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User description updated successfully",
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

	update := bson.M{"$set": bson.M{"profilepic": profileUrl.NewProfilePic}}

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
	curRole := c.Locals("UserRole")
	if curRole != roles.Admin && curRole != roles.Professor {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "You do not have permission to update",
		})
	} // make sure that only admins can use this route
	id := c.Params("id")
	userID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid ID",
		})
	}

	// var role = roles.Ta

	filter := bson.M{"_id": userID}
	update := bson.M{"$set": bson.M{"roles": roles.Ta}}

	collection := db.GetCollection((&models.User{}).TableName())

	var targetUser models.User
	err = collection.FindOne(context.Background(), filter).Decode(&targetUser)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if targetUser.Roles == roles.Admin {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"err": "You do not have permission to update this user",
		})
	}

	if targetUser.Roles == roles.Professor && curRole != roles.Admin {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "You do not have permission to update this user",
		})
	}
	// gets the targeted user to ensure that that professors can not downgrade other professors
	_, err = collection.UpdateOne(context.Background(), filter, update) //update the role
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
	// update := bson.M{"$set": bson.M{"roles": role}}

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
	curRole := c.Locals("UserRole")
	if curRole != roles.Admin && curRole != roles.Professor {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "You do not have permission to update",
		})
	} // make sure that only admins can use this route
	id := c.Params("id")
	userID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid ID",
		})
	}

	filter := bson.M{"_id": userID}
	update := bson.M{"$set": bson.M{"roles": roles.Student}}

	collection := db.GetCollection((&models.User{}).TableName())

	var user models.User
	err = collection.FindOne(context.Background(), filter).Decode(&user)

	if user.Roles == roles.Admin {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"err": "You do not have permission to update this user",
		})
	}

	if user.Roles == roles.Professor && curRole != roles.Admin {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"err": "You do not have permission to update this user",
		})
	}

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User not found" + err.Error(),
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
	curRole := c.Locals("UserRole")
	if curRole != roles.Admin && curRole != roles.Professor {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "You do not have permission to update",
		})
	} // make sure that only admins can use this route
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
	update := bson.M{"$set": bson.M{"roles": role}}

	collection := db.GetCollection((&models.User{}).TableName())

	// User to update
	var targetUser models.User

	// Find the user to update
	err = collection.FindOne(context.Background(), filter).Decode(&targetUser)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if targetUser.Roles == roles.Admin {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"err": "You do not have permission to update this user",
		})
	}

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

// Function to get all users
func GetAllUsers(c *fiber.Ctx) error {
	collection := db.GetCollection((&models.User{}).TableName())
	var users []models.User
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get users",
		})
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {
		var user models.User
		cursor.Decode(&user)
		users = append(users, user)
	}
	return c.Status(fiber.StatusOK).JSON(users)
}

// Aditional CRUD utility methods labeled CR

// func CreateUserCR(
// 	accessToken string,
// 	firstName string,
// 	lastName string,
// 	email string,
// 	profilePic string,
// 	description string,
// 	roles string) error {
// 	collection := db.GetCollection((&models.User{}).TableName())

// 	insert := bson.M{
// 		"accessToken": accessToken,
// 		"firstName":   firstName,
// 		"lastName":    lastName,
// 		"email":       email,
// 		"profilePic":  profilePic,
// 		"description": description,
// 		"roles":       roles}

// 	_, err := collection.InsertOne(context.Background(), insert)
// 	return err
// }

// func GetUserCR(id string) (models.User, error) {
// 	collection := db.GetCollection((&models.User{}).TableName())
// 	filter := bson.M{"_id": id}
// 	var foundUser models.User
// 	err := collection.FindOne(context.Background(), filter).Decode(&foundUser)
// 	return foundUser, err
// }

// func UpdateUserCR(
// 	id string,
// 	accessToken string,
// 	firstName string,
// 	lastName string,
// 	email string,
// 	profilePic string,
// 	description string,
// 	roles string) error {
// 	collection := db.GetCollection((&models.User{}).TableName())
// 	filter := bson.M{"_id": id}
// 	update := bson.M{"$set": bson.M{
// 		"accessToken": accessToken,
// 		"firstName":   firstName,
// 		"lastName":    lastName,
// 		"email":       email,
// 		"profilePic":  profilePic,
// 		"description": description,
// 		"roles":       roles}}
// 	_, err := collection.UpdateOne(context.Background(), filter, update)
// 	return err
// }

// func DeleteUserCR(id string) error {
// 	collection := db.GetCollection((&models.User{}).TableName())
// 	filter := bson.M{"_id": id}
// 	_, err := collection.DeleteOne(context.Background(), filter)
// 	return err
// }
