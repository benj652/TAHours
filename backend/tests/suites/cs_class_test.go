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

// setupTestAppCSClass initializes a new Fiber app for testing CS class routes.
// It sets up the test database with the provided MongoDB client and registers
// the CS class routes to the app.
func setupTestAppCSClass(client *mongo.Client) *fiber.App {
	app := fiber.New()
	db.SetTestDB(client)
	routes.CSClassRoutes(app)
	return app
}

func runCSClassTest(mt *mtest.T, method, url, requestBody string, expectedStatus int, mockResponses ...bson.D) {
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
	app := setupTestAppCSClass(mt.Client)

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

func TestGetCSClass(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("Get a CS Class", func(mt *mtest.T) {
		runPostTest(mt, "GET", "/api/cs-class/get/:id", "", fiber.StatusOK, bson.D{}, bson.D{})
	})

	mt.Run("Create and Get a CS Class", func(mt *mtest.T) {
		runPostTest(mt, "POST", "/api/cs-class/create", `{"name": "CS330", "Semester": "Fall", "Year": 2024}: "This is a new CS Class"}`, fiber.StatusOK, bson.D{})
		runPostTest(mt, "GET", "/api/cs-class/get/:id", "", fiber.StatusOK, bson.D{{"user", "Slump"}, {"title", "New Post"}, {"body", "This is a new post"}}, bson.D{}) // definitely wrong
	})
}

func TestCreateCSClass(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	tests := []struct {
		name           string
		requestBody    string
		expectedStatus int
	}{
		{"Create CSClass", `{"name": "CS330", "Semester": "Fall", "Year": 2024}`, fiber.StatusOK},
		{"Create CSClass No Name", `{"name": "", "Semester": "Fall", "Year": 2024}`, fiber.StatusBadRequest},
		{"Create CSClass No Semester", `{"name": "CS330", "Semester: "", "Year:" 2024}`, fiber.StatusBadRequest},
		{"Create CSClass No Year", `{"name": "", "Semester": "Fall", "Year": ""}`, fiber.StatusBadRequest},
	}

	for _, tt := range tests {
		mt.Run(tt.name, func(mt *mtest.T) {
			runCSClassTest(mt, "POST", "/api/cs-class/create", tt.requestBody, tt.expectedStatus, bson.D{})
		})
	}
}
