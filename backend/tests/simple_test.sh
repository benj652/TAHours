#!/bin/bash

curl -X GET http://localhost:8000/user -H "Content-Type: application/json" -d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "roles": ["admin", "user"]
}'
