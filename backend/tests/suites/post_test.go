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
func setupTestAppPosts(client *mongo.Client) *fiber.App {
	app := fiber.New()
	db.SetTestDB(client)
	routes.PostRoutes(app)
	return app
}

func TestCreatePosts(t *testing.T) {
	// mtest.Setup()
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	// defer mt.Cleanup()

	mt.Run("Create Post", func(mt *mtest.T) {
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
		app := setupTestAppPosts(mt.Client)

		// Add mock responses
		mt.AddMockResponses(mtest.CreateCursorResponse(1, "db.collection", mtest.FirstBatch, bson.D{}))
		mt.AddMockResponses(mtest.CreateSuccessResponse())

		// Create a new request to create a post
		requestBody := `{"user": "Slump", "title": "New Post", "body": "This is a new post"}`
		req := httptest.NewRequest("POST", "/api/posts/create", bytes.NewBuffer([]byte(requestBody)))
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

		fmt.Println("Create Post Response:", responseMap)

		// Abort the transaction to roll back changes
		if err := session.AbortTransaction(ctx); err != nil {
			mt.Fatalf("failed to abort transaction: %v", err)
		}
	})

	mt.Run("Create Post No Title", func(mt *mtest.T) {
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
		app := setupTestAppPosts(mt.Client)

		// Add mock responses
		mt.AddMockResponses(mtest.CreateCursorResponse(1, "db.collection", mtest.FirstBatch, bson.D{}))
		mt.AddMockResponses(mtest.CreateSuccessResponse())

		// Create a new request to create a post
		requestBody := `{"user": "Slump", "title": "", "body": "This is a new post"}`
		req := httptest.NewRequest("POST", "/api/posts/create", bytes.NewBuffer([]byte(requestBody)))
		req.Header.Set("Content-Type", "application/json")

		// Test the request
		resp, err := app.Test(req, -1)
		if err != nil {
			mt.Fatalf("failed to send request: %v", err)
		}

		if resp.StatusCode != fiber.StatusBadRequest {
			mt.Errorf("expected status %d, got %d", fiber.StatusBadRequest, resp.StatusCode)
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

		fmt.Println("Create Post Response:", responseMap)

		// Abort the transaction to roll back changes
		if err := session.AbortTransaction(ctx); err != nil {
			mt.Fatalf("failed to abort transaction: %v", err)
		}
	})
	mt.Run("Create Post No Body", func(mt *mtest.T) {
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
		app := setupTestAppPosts(mt.Client)

		// Add mock responses
		mt.AddMockResponses(mtest.CreateCursorResponse(1, "db.collection", mtest.FirstBatch, bson.D{}))
		mt.AddMockResponses(mtest.CreateSuccessResponse())

		// Create a new request to create a post
		requestBody := `{"user": "Slump", "title": "Title", "body": ""}`
		req := httptest.NewRequest("POST", "/api/posts/create", bytes.NewBuffer([]byte(requestBody)))
		req.Header.Set("Content-Type", "application/json")

		// Test the request
		resp, err := app.Test(req, -1)
		if err != nil {
			mt.Fatalf("failed to send request: %v", err)
		}

		if resp.StatusCode != fiber.StatusBadRequest {
			mt.Errorf("expected status %d, got %d", fiber.StatusBadRequest, resp.StatusCode)
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

		fmt.Println("Create Post Response:", responseMap)

		// Abort the transaction to roll back changes
		if err := session.AbortTransaction(ctx); err != nil {
			mt.Fatalf("failed to abort transaction: %v", err)
		}
	})
	mt.Run("Create Post No User", func(mt *mtest.T) {
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
		app := setupTestAppPosts(mt.Client)

		// Add mock responses
		mt.AddMockResponses(mtest.CreateCursorResponse(1, "db.collection", mtest.FirstBatch, bson.D{}))
		mt.AddMockResponses(mtest.CreateSuccessResponse())

		// Create a new request to create a post
		requestBody := `{"title": "Title", "Body": "This is a new post"}`
		req := httptest.NewRequest("POST", "/api/posts/create", bytes.NewBuffer([]byte(requestBody)))
		req.Header.Set("Content-Type", "application/json")

		// Test the request
		resp, err := app.Test(req, -1)
		if err != nil {
			mt.Fatalf("failed to send request: %v", err)
		}

		if resp.StatusCode != fiber.StatusBadRequest {
			mt.Errorf("expected status %d, got %d", fiber.StatusBadRequest, resp.StatusCode)
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

		fmt.Println("Create Post Response:", responseMap)

		// Abort the transaction to roll back changes
		if err := session.AbortTransaction(ctx); err != nil {
			mt.Fatalf("failed to abort transaction: %v", err)
		}
	})
}

func TestGetAllPosts(t *testing.T) {
	// mtest.Setup()
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	// defer mt.Cleanup()
	mt.Run("Create and Get All Posts", func(mt *mtest.T) {
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
		app := setupTestAppPosts(mt.Client)

		// Add mock responses for creating a post
		mt.AddMockResponses(mtest.CreateSuccessResponse())

		// Create a new request to create a post
		requestBody := `{"user": "Slump", "title": "New Post", "body": "This is a new post"}`
		req := httptest.NewRequest("POST", "/api/posts/create", bytes.NewBuffer([]byte(requestBody)))
		req.Header.Set("Content-Type", "application/json")

		// Test the create post request
		resp, err := app.Test(req, -1)
		if err != nil {
			mt.Fatalf("failed to send request: %v", err)
		}

		if resp.StatusCode != fiber.StatusOK {
			mt.Errorf("expected status %d, got %d", fiber.StatusOK, resp.StatusCode)
		}

		// Add mock response for getting all posts
		mt.AddMockResponses(mtest.CreateCursorResponse(1, "db.collection", mtest.FirstBatch, bson.D{{"user", "Slump"}, {"title", "New Post"}, {"body", "This is a new post"}}))
		mt.AddMockResponses(mtest.CreateCursorResponse(1, "db.collection", mtest.NextBatch))
		// Create a new request to get all posts
		req = httptest.NewRequest("GET", "/api/posts/all", nil)
		req.Header.Set("Content-Type", "application/json")

		// Test the get all posts request
		resp, err = app.Test(req, -1)
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

		var responseMap []map[string]interface{}
		if err := json.Unmarshal(body, &responseMap); err != nil {
			mt.Fatalf("failed to parse response body: %v", err)
		}

		fmt.Println("Get All Posts Response:", responseMap)

		// Abort the transaction to roll back changes
		if err := session.AbortTransaction(ctx); err != nil {
			mt.Fatalf("failed to abort transaction: %v", err)
		}
	})
}
