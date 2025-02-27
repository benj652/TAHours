package socket

import (
	"fmt"
	"log"
	"sync"

	"github.com/gofiber/websocket/v2"
)

var (
	userSocketMap   = make(map[string]*websocket.Conn)
	threadSocketMap = make(map[string]*websocket.Conn)
	mutex           = sync.Mutex{}
)

func HandleWebSocket(c *websocket.Conn) {
	defer c.Close()

	userId := c.Query("userWSId")

	if userId != "undefined" && userId != "" {
		mutex.Lock()
		userSocketMap[userId] = c
		mutex.Unlock()
	}
	threadAccess := c.Query("threadAccess")

	if threadAccess != "undefined" && threadAccess != "" {
		fmt.Println("Thread Access:", threadAccess)
		mutex.Lock()
		threadSocketMap[userId] = c
		mutex.Unlock()
	}

	BroadcastOnlineUsers()

	log.Println("User Connected:", userId)

	for {
		_, msg, err := c.ReadMessage()
		if err != nil {
			fmt.Printf("User Disconnected: %s (IP: %s)\n", userId, c.RemoteAddr())
			break
		}
		fmt.Printf("Received from %s: %s\n", userId, string(msg))

		// Echo message back
		if err := c.WriteMessage(websocket.TextMessage, msg); err != nil {
			fmt.Println("Error writing message:", err)
			break
		}
	}

	// Handle disconnect
	mutex.Lock()
	delete(userSocketMap, userId)
	mutex.Unlock()
	BroadcastOnlineUsers()

	log.Println("User Disconnected:", userId)
}

// test function to broadcast online users
func BroadcastOnlineUsers() {
	mutex.Lock()
	defer mutex.Unlock()

	users := []string{}
	for userId := range userSocketMap {
		users = append(users, userId)
	}

	for _, conn := range userSocketMap {
		if err := conn.WriteJSON(users); err != nil {
			log.Println("Error broadcasting online users:", err)
		}
	}
}

// BroadcastJSON sends any JSON payload to all connected clients
func BroadcastJSONToAll(messageType string, data interface{}) {
	mutex.Lock()
	defer mutex.Unlock()
	
	payload := map[string]interface{}{
		"type": messageType,
		"data": data,
	}

	for _, conn := range userSocketMap {
		err := conn.WriteJSON(payload)
		if err != nil {
			log.Println("Error broadcasting JSON:", err)
		}
	}
}

func BroadcastJSONToUser(userId string, data interface{}) {
	mutex.Lock()
	defer mutex.Unlock()
	conn, ok := userSocketMap[userId]
	if !ok {
		log.Println("User not found:", userId)
		return
	}
	err := conn.WriteJSON(data)
	if err != nil {
		log.Println("Error broadcasting JSON to user:", err)
	}
}

// For sending messages to all but the students
func BroadcastJSONToThread(messageType, data interface{}) {
	mutex.Lock()
	defer mutex.Unlock()
	// Wrap the message data with a type field
	payload := map[string]interface{}{
		"type": messageType,
		"data": data,
	}

	for _, conn := range threadSocketMap {
		err := conn.WriteJSON(payload)
		if err != nil {
			log.Println("Error broadcasting JSON:", err)
		}
	}
}
