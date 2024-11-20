package tests

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http/httptest"
	"testing"

	"github.com/benj-652/TAHours/db"
	"github.com/benj-652/TAHours/routes"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/integration/mtest"
)

// Setup the app for testing
func setupTestApp(client *mongo.Client) *fiber.App {
	app := fiber.New()
	db.SetTestDB(client)
	routes.UserRoutes(app)
	return app
}

func TestGetOrCreateUser(t *testing.T) {
	// mtest.Setup()
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	// defer mtest.Teardown()

	mt.Run("Get or Create User", func(mt *mtest.T) {
		// Start a session
		session, err := mt.Client.StartSession()
		if err != nil {
			mt.Fatalf("failed to start session: %v", err)
		}
		defer session.EndSession(context.Background())

		// Start a transaction
		err = session.StartTransaction()
		if err != nil {
			mt.Fatalf("failed to start transaction: %v", err)
		}

		// Use the session context for operations
		ctx := mongo.NewSessionContext(context.Background(), session)

		// Setup the app with the session context
		app := setupTestApp(mt.Client)

		// Add mock responses
		mt.AddMockResponses(mtest.CreateCursorResponse(1, "db.collection", mtest.FirstBatch, bson.D{}))
		mt.AddMockResponses(mtest.CreateSuccessResponse())

		// Create a new request
		requestBody := `{"accessToken": "202020", "firstName": "Slump", "lastName": "Gorb", "email": "segorb27@colby.edu"}`
		req := httptest.NewRequest("POST", "/api/user/get-or-create", bytes.NewBuffer([]byte(requestBody)))
		req.Header.Set("Content-Type", "application/json")

		// Test the request
		resp, err := app.Test(req, -1)
		if err != nil {
			mt.Fatalf("failed to send request: %v", err)
		}

		if resp.StatusCode != fiber.StatusOK {
			mt.Errorf("expected status %d, got %d", fiber.StatusOK, resp.StatusCode)
		}

		// Read and parse the response body
		body, err := io.ReadAll(resp.Body)
		if err != nil {
			mt.Fatalf("failed to read response body: %v", err)
		}

		var responseMap map[string]interface{}
		if err := json.Unmarshal(body, &responseMap); err != nil {
			mt.Fatalf("failed to parse response body: %v", err)
		}

		fmt.Println("Response:", responseMap)

		// Abort the transaction to roll back changes
		if err := session.AbortTransaction(ctx); err != nil {
			mt.Fatalf("failed to abort transaction: %v", err)
		}
	})
}
