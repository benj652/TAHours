#/!/bin/bash

curl -X POST http://localhost:8000/api/tickets/create -H "Content-Type: application/json" -d '{"student": "674787db6fa68cc40e7802b1", "problem": "stack not working", "body": "broo my stack is not working"}'