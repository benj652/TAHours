package controllers

import (
	"context"
	"fmt"

	//"go/doc/comment"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/models"
	"github.com/benj-652/TAHours/socket"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	//"go.mongodb.org/mongo-driver/bson/primitive"
)

var rOLES = models.RolesConfig()

// Gets all posts
//
// Does not need any parameters
// Requries the user to be a TA, Professor, or Admin
func GetAllPosts(c *fiber.Ctx) error {
	posts := new([]models.Post)

	if c.Locals(models.USER_ROLE_PARAM) != rOLES.Ta && c.Locals(models.USER_ROLE_PARAM) != rOLES.Admin && c.Locals(models.USER_ROLE_PARAM) != rOLES.Professor {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized to get posts",
		})
	}
	collection := db.GetCollection((&models.Post{}).TableName())

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get posts" + err.Error(),
		})
	}
	if err = cursor.All(context.Background(), posts); err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get posts" + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(posts)
}

// CreatePost handles the creation of a new post in the database.
// It expects a JSON payload in the request body with the post's details,
// including "user", "title", and "body".
// The function returns a JSON response with the newly created post's ID
// if successful. If any required field is missing, it returns a 400 Bad Request error.
// If there is an error creating the post, it returns a 500 Internal Server Error.
func CreatePost(c *fiber.Ctx) error {
	post := new(models.Post)
	if c.Locals(models.USER_ROLE_PARAM) != rOLES.Ta && c.Locals(models.USER_ROLE_PARAM) != rOLES.Admin && c.Locals(models.USER_ROLE_PARAM) != rOLES.Professor {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized to get posts",
		})
	}

	if err := c.BodyParser(post); err != nil {
		return err
	}

	if post.Title == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Include title",
		})
	}

	if post.Body == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Post empty, include body",
		})
	}

	if post.User == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Include user",
		})
	}
	post.Comments = make([]models.Comment, 0)
	post.Comments = append(post.Comments, models.Comment{
		User:    "Automod",
		Content: "Please Be Nice!",
		Title:   "No one shall ever see this",
	})
	collection := db.GetCollection((&models.Post{}).TableName())

	insertedReesult, err := collection.InsertOne(context.Background(), post)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create post" + err.Error(),
		})
	}
	post.ID = insertedReesult.InsertedID.(primitive.ObjectID)

	socket.BroadcastJSONToAll(models.NEW_POST_EVENT, post)

	// changed this so that it just returns the new post. Might mess up some tests
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"post": post,
	})
}

// CreateComment adds a new comment to an existing post in the database.
// The function expects the post ID as a URL parameter and a JSON payload
// with the comment's details in the request body. The JSON payload should
// include the "user" and "content" fields. The function returns a JSON
// response with a success message if the comment is created successfully.
// If the post ID is invalid, it returns a 400 Bad Request error.
// If the user or content is missing in the request body, it returns a
// 400 Bad Request error. If there is an error updating the post in the
// database, it returns a 500 Internal Server Error.
func CreateComment(c *fiber.Ctx) error {
	id := c.Params("id")
	if c.Locals(models.USER_ROLE_PARAM) != rOLES.Ta && c.Locals(models.USER_ROLE_PARAM) != rOLES.Admin && c.Locals(models.USER_ROLE_PARAM) != rOLES.Professor {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized to get posts",
		})
	}
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid post ID",
		})
	}

	comment := new(models.Comment)

	if err := c.BodyParser(comment); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing request body: " + err.Error(),
		})
	}

	if comment.User == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Include user",
		})
	}

	if comment.Content == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Comment empty, include body",
		})
	}
	if comment.Title == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Comment empty, include title",
		})
	}

	collection := db.GetCollection((&models.Post{}).TableName())

	filter := bson.M{"_id": objectID}
	update := bson.M{"$push": bson.M{"comments": comment}}

	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create comment" + err.Error(),
		})
	}
	payload := map[string]interface{}{
		"comment": comment,
		"postId":  id,
	}
	socket.BroadcastJSONToThread(models.NEW_COMMENT_EVENT, payload)
	// I made this return the comment too bc to update data on the frontend
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully created comment",
		"comment": comment,
	})
}

// This was function was missing before
// DeletePost deletes a post from the database. It expects the post ID as a URL parameter.
func DeletePost(c *fiber.Ctx) error {
	id := c.Params("id")
	// fmt.Println(c.Locals("UserRole"))

	// lowkey never tested this but unless there is some wierd pass by reference stuff going on it should work fine. When I made a typo and ran it though it worked fine(as it broke how it should have if no pass by reference) so this is unlikely.
	if c.Locals(models.USER_ROLE_PARAM) != rOLES.Admin && c.Locals(models.USER_ROLE_PARAM) != rOLES.Professor {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized to delete post",
		})
	}
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid post ID",
		})
	}
	collection := db.GetCollection((&models.Post{}).TableName())
	filter := bson.M{"_id": objectID}
	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to delete post" + err.Error(),
		})
	}

	socket.BroadcastJSONToAll(models.DELETE_POST_EVENT, objectID)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully deleted post",
	})
}

// Aditional CRUD utility methods labeled CR

// func CreatePostCR(user string, title string, body string, comments []models.Comment) error {
// 	post := models.Post{User: user, Title: title, Body: body, Comments: comments}
// 	collection := db.GetCollection((&models.Post{}).TableName())

// 	_, err := collection.InsertOne(context.Background(), post)
// 	return err
// }

// func GetPostCR(id primitive.ObjectID) (models.Post, error) {
// 	collection := db.GetCollection((&models.Post{}).TableName())
// 	var post models.Post
// 	filter := bson.M{"_id": id}
// 	err := collection.FindOne(context.Background(), filter).Decode(&post)
// 	return post, err
// }

// func UpdatePostCR(id primitive.ObjectID, user string, title string, body string, comments []models.Comment) error {
// 	collection := db.GetCollection((&models.Post{}).TableName())
// 	filter := bson.M{"_id": id}
// 	update := bson.M{"$set": bson.M{"user": user, "title": title, "body": body, "comments": comments}}
// 	_, err := collection.UpdateOne(context.Background(), filter, update)
// 	return err
// }

// func DeletePostCR(id primitive.ObjectID) error {
// 	collection := db.GetCollection((&models.Post{}).TableName())
// 	filter := bson.M{"_id": id}
// 	_, err := collection.DeleteOne(context.Background(), filter)
// 	return err
// }
