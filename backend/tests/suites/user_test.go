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
func setUpTestUserApp(client *mongo.Client) *fiber.App {
	app := fiber.New()
	db.SetTestDB(client)
	routes.UserRoutes(app)
	return app
}

func runUserTest(mt *mtest.T, method, url, requestBody string, expectedStatus int, mockResponses ...bson.D) {
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
	app := setUpTestUserApp(mt.Client)

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

func TestGetOrCreateUser(t *testing.T) {
	// mtest.Setup()
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	// defer mtest.Teardown()

	tests := []struct {
		name           string
		requestBody    string
		expectedStatus int
	}{
		{"Get or Create User", `{"accessToken": "202020", "firstName": "Slump", "lastName": "Gorb", "email": "segorb27@colby.edu"}`, fiber.StatusOK},
		{"Get or Create User No Access Token", `{"accessToken": "", "firstName": "Slump", "lastName": "Gorb", "email": "segorb27@colby.edu"}`, fiber.StatusBadRequest},
		{"Get or Create User No Access Email", `{"accessToken": "", "firstName": "Slump", "lastName": "Gorb"}`, fiber.StatusBadRequest},
	}

	for _, tt := range tests {
		mt.Run(tt.name, func(mt *mtest.T) {
			runUserTest(mt, "POST", "/api/user/get-or-create", tt.requestBody, tt.expectedStatus, bson.D{}, bson.D{})
		})
	}
}
func TestGetUser(t *testing.T) {
	// mtest.Setup()
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	// defer mtest.Teardown()

	tests := []struct {
		name           string
		requestBody    string
		expectedStatus int
	}{
		{"Get  User", `{"accessToken": "202020", "firstName": "Slump", "lastName": "Gorb", "email": "segorb27@colby.edu"}`, fiber.StatusOK},
		{"Get or Create User No Access Token", `{"accessToken": "", "firstName": "Slump", "lastName": "Gorb", "email": "segorb27@colby.edu"}`, fiber.StatusBadRequest},
		{"Get or Create User No Access Email", `{"accessToken": "", "firstName": "Slump", "lastName": "Gorb"}`, fiber.StatusBadRequest},
	}

	for _, tt := range tests {
		mt.Run(tt.name, func(mt *mtest.T) {
			runUserTest(mt, "GET", "/api/user/get", tt.requestBody, tt.expectedStatus, bson.D{{"accessToken", "202020"}, {"firstName", "Slump"}, {"lastName", "Gorb"}, {"email", "segorb27@colby.edu"}}, bson.D{})
		})
	}
}

func TestUpdateDescription(t *testing.T) {
	// mtest.Setup()
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	// defer mtest.Teardown()
	mockResponse := bson.D{
		{"_id", "507f191e810c19729de860ea"},
		{"firstName", "Slump"}, {"lastName", "Gorb"}, {"email", "segorb27@colby.edu"},
		{"description", "This is a new description"},
		{"accessToken", "202020"},
		{"profilePic", "https://example.com/profile-pic.jpg"},
		{"roles", "TA"},
	}
	tests := []struct {
		name           string
		requestBody    string
		expectedStatus int
	}{
		{"Update Description", `{"accessToken": "202020", "description": "This is a new description"}`, fiber.StatusOK},
		{"Update Description No Access Token", `{"accessToken": "", "description": "This is a new description"}`, fiber.StatusOK},
	}

	for _, tt := range tests {
		mt.Run(tt.name, func(mt *mtest.T) {
			runUserTest(mt, "POST", "/api/user/update-description/507f191e810c19729de860ea", tt.requestBody, tt.expectedStatus, mockResponse)
		})
	}
}
func TestUpdateProfile(t *testing.T) {
	// mtest.Setup()
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))
	// defer mtest.Teardown()
	mockResponse := bson.D{
		{"_id", "507f191e810c19729de860ea"},
		{"firstName", "Slump"}, {"lastName", "Gorb"}, {"email", "segorb27@colby.edu"},
		{"description", "This is a new description"},
		{"accessToken", "202020"},
		{"profilePic", "https://example.com/profile-pic.jpg"},
		{"roles", "TA"},
	}
	tests := []struct {
		name           string
		requestBody    string
		expectedStatus int
	}{
		{"Update Profile Pic", `{"accessToken": "202020", "description": "This is a new description"}`, fiber.StatusOK},
		{"Update Profile Pic No Access Token", `{"accessToken": "", "description": "This is a new description"}`, fiber.StatusOK},
	}

	for _, tt := range tests {
		mt.Run(tt.name, func(mt *mtest.T) {
			runUserTest(mt, "POST", "/api/user/change-profile-pic/507f191e810c19729de860ea", tt.requestBody, tt.expectedStatus, mockResponse)
		})
	}
}
