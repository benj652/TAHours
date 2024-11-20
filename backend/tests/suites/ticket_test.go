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

func setupTestAppTicket(client *mongo.Client) *fiber.App {
	app := fiber.New()
	db.SetTestDB(client)
	routes.TicketRoutes(app)
	return app
}

func runTicketTest(mt *mtest.T, method, url, requestBody string, expectedStatus int, mockResponses ...bson.D) {
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
	app := setupTestAppTicket(mt.Client)

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

func TestCreateTicket(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	tests := []struct {
		name           string
		requestBody    string
		expectedStatus int
	}{
		{"Valid Ticket", `{"problem": "Need help with HW", "description": "Stuck on problem 2", "studentId": "507f191e810c19729de860ea"}`, fiber.StatusOK},
		{"Missing Problem", `{"description": "Stuck on problem 2", "studentId": "507f191e810c19729de860ea"}`, fiber.StatusBadRequest},
		{"Missing Description", `{"problem": "Need help with HW", "studentId": "507f191e810c19729de860ea"}`, fiber.StatusBadRequest},
		{"Missing Student", `{"problem": "Need help with HW", "description": "Stuck on problem 2"}`, fiber.StatusBadRequest},
	}
	for _, tt := range tests {
		mt.Run(tt.name, func(mt *mtest.T) {
			runTicketTest(mt, "POST", "/api/ticket/create", tt.requestBody, tt.expectedStatus, bson.D{}, bson.D{}, bson.D{})
		})
	}
}

func TestGetTicket(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("Valid Ticket ID", func(mt *mtest.T) {
		mockResponse := bson.D{{"_id", "507f191e810c19729de860ea"},
			{"problem", "Need help"},
			{"description", "Stuck on HW"},
			{"student", "507f191e810c19729de860eb"}}
		runTicketTest(mt, "GET", "/api/tickets/get/507f191e810c19729de860ea", "", fiber.StatusOK, mockResponse)
	})

	mt.Run("Invalid Ticket ID", func(mt *mtest.T) {
		runTicketTest(mt, "GET", "/api/ticket/get/507f191e810c19729de860eb", "", fiber.StatusBadRequest)
	})
}

func TestResolveTicket(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("Valid Resolve", func(mt *mtest.T) {
		runTicketTest(mt, "PATCH", "/api/tickets/resolve/507f191e810c19729de860eb", `{"taId": "507f191e810c19729de860eb", "taNote": "Resolved issue"}`, fiber.StatusOK)
	})

	mt.Run("Invalid Ticket ID", func(mt *mtest.T) {
		runTicketTest(mt, "PATCH", "/api/tickets/resolve/badID", `{"taId": "507f191e810c19729de860eb", "taNote": "Resolved issue"}`, fiber.StatusBadRequest)
	})
}

func TestDeleteTicket(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("Valid Delete", func(mt *mtest.T) {
		runTicketTest(mt, "DELETE", "/api/tickets/delete/:id", "", fiber.StatusOK)
	})

	mt.Run("Invalid Ticket ID", func(mt *mtest.T) {
		runTicketTest(mt, "DELETE", "/api/tickets/delete/badID", "", fiber.StatusBadRequest)
	})
}

func TestGetUserTickets(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("Valid User ID", func(mt *mtest.T) {
		mockResponse := bson.D{{"_id", "507f191e810c19729de860ea"}, {"problem", "Help on HW"}, {"description", "Details here"}, {"student", "507f191e810c19729de860eb"}}
		runTicketTest(mt, "GET", "/api/tickets/get-user-tickets/507f191e810c19729de860ea", "", fiber.StatusOK, mockResponse)
	})

	mt.Run("Invalid User ID", func(mt *mtest.T) {
		runTicketTest(mt, "GET", "/api/tickets/get-user-tickets/badID", "", fiber.StatusBadRequest)
	})
}
