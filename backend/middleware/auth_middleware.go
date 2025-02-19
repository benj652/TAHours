package middleware

import (
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/api/idtoken"
)

func AuthMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Get token from Authorization header
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing token"})
		}

		// Extract token from "Bearer <token>"
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid token format"})
		}
		token := tokenParts[1]

		// Verify token
		payload, err := verifyGoogleToken(token)
		if err != nil {
			fmt.Println("Token verification failed:", err)
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
		}
		// fmt.Println("Token verified:", payload)

		// Store user info in context
		c.Locals("Email", payload.Claims["email"])
		c.Locals("FirstName", payload.Claims["given_name"])
		c.Locals("LastName", payload.Claims["family_name"])
		c.Locals("profilePic", payload.Claims["picture"])
		// c.Locals("name", payload.Claims["name"])
		c.Locals("AccessToken", payload.Claims["sub"]) // Google's unique user ID

		return c.Next()
	}
}

func verifyGoogleToken(idToken string) (*idtoken.Payload, error) {
	ctx := context.Background()
	GOOGLE_CLIENT_ID := os.Getenv("GOOGLE_CLIENT_ID")
	payload, err := idtoken.Validate(ctx, idToken, GOOGLE_CLIENT_ID)
	if err != nil {
		return nil, err
	}
	return payload, nil
}
