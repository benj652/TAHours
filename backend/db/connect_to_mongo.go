package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var connectedDB *mongo.Database

func ConnectToMongo() {
	// Connect to MongoDB
	MONGODB_URI := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal("Error connecting to MongoDB: ", err)
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Error pinging MongoDB", err)
	}
	fmt.Println("Connected to MongoDB!")

	DATABASE_NAME := os.Getenv("DATABASE_NAME")
	connectedDB = client.Database(DATABASE_NAME)

	// defer client.Disconnect(context.Background())
}
func GetCollection(collectionName string) *mongo.Collection {
	return connectedDB.Collection(collectionName)
}

func DisconnectFromMongo() {
	err := connectedDB.Client().Disconnect(context.Background())
	if err != nil {
		log.Fatal("Error disconnecting from MongoDB", err)
	}
}
