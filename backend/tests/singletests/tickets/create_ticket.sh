#/!/bin/bash

curl -X POST http://localhost:8000/api/tickets/create -H "Content-Type: application/json" -d '{"user": "Slump Gorb", "title": "Test Ticket", "body": "tickettest"}'