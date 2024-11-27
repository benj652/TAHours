#/!/bin/bash

curl -X POST http://localhost:8000/api/ticket/create/67478cf04b24ed5f28da0939 -H "Content-Type: application/json" -d '{"studentId": "674787db6fa68cc40e7802b1", "problem": "stack not working", "description": "broo my stack is not working"}'