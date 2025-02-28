package middleware

import (
	"context"

	"github.com/benj-652/TAHours/db"     // Your DB connection
	"github.com/benj-652/TAHours/models" // Assuming your user model is here
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

// Performs a query to get specific user details.
// Must be called AFTER the auth middleware as it 
// uses the JWT to get the user's email.
func UserMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Get email from AuthMiddleware
		collection := db.GetCollection((&models.User{}).TableName())
		email, ok := c.Locals("Email").(string)
		if !ok || email == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User email not found"})
		}

		// Query the database for user info

		filter := bson.M{"email": email}
		// update := bson.M{ "$setOnInsert": user}
		var user models.User
		err := collection.FindOne(context.Background(), filter).Decode(&user)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "User not found",
			})
		}
		// Store user details in context for access in routes
		c.Locals(models.USER_ID_POST_PARAM, user.ID)
		c.Locals(models.USER_ROLE_PARAM, user.Roles)

		return c.Next()
	}
}
