package socket

import (
	"fmt"
	"log"
	"sync"

	"github.com/benj-652/TAHours/models"
	"github.com/gofiber/websocket/v2"
)

var (
	userSocketMap   = make(map[string][]*websocket.Conn) // Allow multiple connections per user
	threadSocketMap = make(map[string][]*websocket.Conn) // Allow multiple thread connections
	mutex           = sync.Mutex{}
)

func HandleWebSocket(c *websocket.Conn) {
	defer c.Close()

	userId := c.Query(models.WEBSOCKET_ID_PARAM)

	if userId != "undefined" && userId != "" {
		mutex.Lock()
		userSocketMap[userId] = append(userSocketMap[userId], c)
		mutex.Unlock()
	}

	threadAccess := c.Query(models.WEBSOCKET_THREAD_PARAM)
	if threadAccess != "undefined" && threadAccess != "" {
		fmt.Println("Thread Access:", threadAccess)
		mutex.Lock()
		threadSocketMap[userId] = append(threadSocketMap[userId], c)
		mutex.Unlock()
	}

	BroadcastOnlineUsers()
	log.Println("User Connected:", userId)

	for {
		_, msg, err := c.ReadMessage()
		if err != nil {
			fmt.Printf("User Disconnected: %s (IP: %s)\n", userId, c.RemoteAddr())
			removeConnection(userId, c)
			break
		}
		fmt.Printf("Received from %s: %s\n", userId, string(msg))

		// Echo message back
		if err := c.WriteMessage(websocket.TextMessage, msg); err != nil {
			fmt.Println("Error writing message:", err)
			removeConnection(userId, c)
			break
		}
	}

	// Handle disconnect
	removeConnection(userId, c)
	BroadcastOnlineUsers()
	log.Println("User Disconnected:", userId)
}

// Remove a WebSocket connection from the userSocketMap
func removeConnection(userId string, conn *websocket.Conn) {
	mutex.Lock()
	defer mutex.Unlock()

	connections, exists := userSocketMap[userId]
	if !exists {
		return
	}

	var updatedConnections []*websocket.Conn
	for _, c := range connections {
		if c != conn {
			updatedConnections = append(updatedConnections, c)
		}
	}

	if len(updatedConnections) == 0 {
		delete(userSocketMap, userId)
	} else {
		userSocketMap[userId] = updatedConnections
	}
}

// Broadcast list of online users to all connections
func BroadcastOnlineUsers() {
	mutex.Lock()
	defer mutex.Unlock()

	users := []string{}
	for userId := range userSocketMap {
		users = append(users, userId)
	}

	for _, connections := range userSocketMap {
		for _, conn := range connections {
			if err := conn.WriteJSON(users); err != nil {
				log.Println("Error broadcasting online users:", err)
			}
		}
	}
}

// Broadcast JSON to all users
func BroadcastJSONToAll(messageType string, data interface{}) {
	mutex.Lock()
	defer mutex.Unlock()

	payload := map[string]interface{}{
		"type": messageType,
		"data": data,
	}

	for _, connections := range userSocketMap {
		for _, conn := range connections {
			if err := conn.WriteJSON(payload); err != nil {
				log.Println("Error broadcasting JSON:", err)
			}
		}
	}
}

// Send JSON message to a specific user
func BroadcastJSONToUser(userId string, messageType string, data interface{}) {
	mutex.Lock()
	defer mutex.Unlock()

	connections, ok := userSocketMap[userId]
	if !ok {
		log.Println("User not found:", userId)
		return
	}

	payload := map[string]interface{}{
		"type": messageType,
		"data": data,
	}

	for _, conn := range connections {
		if err := conn.WriteJSON(payload); err != nil {
			log.Println("Error broadcasting JSON to user:", err)
		}
	}
}

// Send JSON to all connections in a thread
func BroadcastJSONToThread(messageType string, data interface{}) {
	mutex.Lock()
	defer mutex.Unlock()

	payload := map[string]interface{}{
		"type": messageType,
		"data": data,
	}

	for _, connections := range threadSocketMap {
		for _, conn := range connections {
			if err := conn.WriteJSON(payload); err != nil {
				log.Println("Error broadcasting JSON to thread:", err)
			}
		}
	}
}
