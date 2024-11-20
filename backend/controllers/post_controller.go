package controllers

import (
	"context"
	"fmt"

	//"go/doc/comment"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	//"go.mongodb.org/mongo-driver/bson/primitive"
)

// Get all posts
func GetAllPosts(c *fiber.Ctx) error {
	posts := new([]models.Post)

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

// make a new post and save it to the database
func CreatePost(c *fiber.Ctx) error {
	post := new(models.Post)

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
	collection := db.GetCollection((&models.Post{}).TableName())

	insertResult, err := collection.InsertOne(context.Background(), post)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create post" + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully created post",
		"post":    insertResult.InsertedID,
	})
}

func CreateComment(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	comment := new(models.Comment)

	if err := c.BodyParser(comment); err != nil {
		return err
	}

	if comment.Content == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Comment empty, include body",
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

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully created comment",
	})
}
