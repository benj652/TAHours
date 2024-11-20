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

func setupTestAppPosts(client *mongo.Client) *fiber.App {
	app := fiber.New()
	db.SetTestDB(client)
	routes.PostRoutes(app)
	return app
}

func runPostTest(mt *mtest.T, method, url, requestBody string, expectedStatus int, mockResponses ...bson.D) {
	session, err := mt.Client.StartSession()
	if err != nil {
		mt.Fatalf("failed to start session: %v", err)
	}
	defer session.EndSession(context.Background())

	err = session.StartTransaction()
	if err != nil {
		mt.Fatalf("failed to start transaction: %v", err)
	}

	ctx := mongo.NewSessionContext(context.Background(), session)
	app := setupTestAppPosts(mt.Client)

	for i, response := range mockResponses {
		if i == 0 {
			mt.AddMockResponses(mtest.CreateCursorResponse(1, "db.collection", mtest.FirstBatch, response))
		} else {
			mt.AddMockResponses(mtest.CreateCursorResponse(1, "db.collection", mtest.NextBatch))
		}
	}

	req := httptest.NewRequest(method, url, bytes.NewBuffer([]byte(requestBody)))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req, -1)
	if err != nil {
		mt.Fatalf("failed to send request: %v", err)
	}

	if resp.StatusCode != expectedStatus {
		mt.Errorf("expected status %d, got %d", expectedStatus, resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		mt.Fatalf("failed to read response body: %v", err)
	}

	var responseMap interface{}
	if err := json.Unmarshal(body, &responseMap); err != nil {
		mt.Fatalf("failed to parse response body: %v", err)
	}

	fmt.Println("Response:", responseMap)

	if err := session.AbortTransaction(ctx); err != nil {
		mt.Fatalf("failed to abort transaction: %v", err)
	}
}

func TestCreatePosts(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	tests := []struct {
		name           string
		requestBody    string
		expectedStatus int
	}{
		{"Create Post", `{"user": "Slump", "title": "New Post", "body": "This is a new post"}`, fiber.StatusOK},
		{"Create Post No Title", `{"user": "Slump", "title": "", "body": "This is a new post"}`, fiber.StatusBadRequest},
		{"Create Post No Body", `{"user": "Slump", "title": "Title"}`, fiber.StatusBadRequest},
		{"Create Post No User", `{"title": "Title", "body": "This is a new post"}`, fiber.StatusBadRequest},
	}

	for _, tt := range tests {
		mt.Run(tt.name, func(mt *mtest.T) {
			runPostTest(mt, "POST", "/api/posts/create", tt.requestBody, tt.expectedStatus, bson.D{})
		})
	}
}

func TestGetAllPosts(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("Get All Posts", func(mt *mtest.T) {
		runPostTest(mt, "GET", "/api/posts/all", "", fiber.StatusOK, bson.D{}, bson.D{})
	})

	mt.Run("Create and Get All Posts", func(mt *mtest.T) {
		runPostTest(mt, "POST", "/api/posts/create", `{"user": "Slump", "title": "New Post", "body": "This is a new post"}`, fiber.StatusOK, bson.D{})
		runPostTest(mt, "GET", "/api/posts/all", "", fiber.StatusOK, bson.D{{"user", "Slump"}, {"title", "New Post"}, {"body", "This is a new post"}}, bson.D{})
	})
}

func TestComments(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	tests := []struct {
		name           string
		requestBody    string
		expectedStatus int
	}{
		{"Create and Comment", `{"user": "Slump", "content": "This is a new comment"}`, fiber.StatusOK},
		{"No user", `{"content": "This is a new comment"}`, fiber.StatusBadRequest},
		{"No content", `{"user": "This is a new comment"}`, fiber.StatusBadRequest},
	}

	for _, tt := range tests {
		mt.Run(tt.name, func(mt *mtest.T) {
			runPostTest(mt, "POST", "/api/posts/comment/673e01c0b881d18ea5b68f0a", tt.requestBody, tt.expectedStatus, bson.D{{"post", bson.D{{"user", "Slump"}, {"title", "New Post"}, {"body", "This is a new post"}, {"_id", "673e01c0b881d18ea5b68f0a"}}}})
		})
	}
}
