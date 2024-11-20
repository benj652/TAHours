#!/bin/bash

curl -X POST http://localhost:8000/api/cs-class/create -H "Content-Type: application/json" -d '{
  "name": "CS420",
  "semester": "spring",
  "year": 1984,
}'
