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
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/integration/mtest"
)

func setupTestAppTAQueue(client *mongo.Client) *fiber.App {
	app := fiber.New()
	db.SetTestDB(client)
	routes.TAQueueRoutes(app)
	return app
}

func runQueueTest(mt *mtest.T, method, url, requestBody string, expectedStatus int, mockResponses ...bson.D) {
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
	app := setupTestAppTAQueue(mt.Client)

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

func TestGetAllTAQueues(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("Get All TA Queues", func(mt *mtest.T) {
		runQueueTest(mt, "GET", "/api/ta-queue/all", "", fiber.StatusOK, bson.D{})
	})
}

func TestAddTaToQueue(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("Add TA to Queue", func(mt *mtest.T) {
		runQueueTest(mt, "POST", "/api/ta-queue/add-ta/507f191e810c19729de860eb", `{"TAId": "507f191e810c19729de860ea"}`, fiber.StatusOK, bson.D{})
	})

	mt.Run("Invalid Queue ID", func(mt *mtest.T) {
		runQueueTest(mt, "POST", "/api/ta-queue/add-ta/invalid_queue_id", `{"TAId": "507f191e810c19729de860ea"}`, fiber.StatusBadRequest, bson.D{})
	})
}

func TestRemoveTaFromQueue(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("Remove TA from Queue", func(mt *mtest.T) {
		mt.AddMockResponses(mtest.CreateCursorResponse(1, "db.collection", mtest.FirstBatch, bson.D{
			{Key: "_id", Value: primitive.NewObjectID()},
			{Key: "TAs", Value: []primitive.ObjectID{primitive.NewObjectID()}},
			{Key: "isActive", Value: true},
		}))

		runQueueTest(mt, "POST", "/api/ta-queue/remove-ta/507f191e810c19729de860eb", `{"TAId": "507f191e810c19729de860ea", "classId": "507f191e810c19729de860ec"}`, fiber.StatusOK, bson.D{}, bson.D{}, bson.D{})
	})

	mt.Run("Invalid Queue ID", func(mt *mtest.T) {
		runQueueTest(mt, "POST", "/api/ta-queue/remove-ta/invalid_queue_id", `{"TAId": "507f191e810c19729de860ea", "classId": "507f191e810c19729de860ec"}`, fiber.StatusBadRequest, bson.D{
			{Key: "message", Value: "Invalid queue ID"},
		}, bson.D{}, bson.D{}, bson.D{})
	})
}

func TestGetActiveTickets(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	tests := []struct {
		name           string
		queueId        string
		requestBody    string
		expectedStatus int
	}{
		{"Get Active Tickets", "507f191e810c19729de860eb", "", fiber.StatusOK},
		{"Invalid Queue ID", "invalid_queue_id", "", fiber.StatusBadRequest},
	}

	mockResponse := bson.D{
		{Key: "_id", Value: primitive.NewObjectID()},
		{Key: "problem", Value: "Need help"},
		{Key: "description", Value: "Stuck on HW"},
		{Key: "student", Value: primitive.NewObjectID()},
	}

	for _, tt := range tests {
		mt.Run(tt.name, func(mt *mtest.T) {
			runQueueTest(mt, "GET", "/api/ta-queue/active-tickets/"+tt.queueId, tt.requestBody, tt.expectedStatus, mockResponse, bson.D{}, bson.D{})
		})
	}
}
