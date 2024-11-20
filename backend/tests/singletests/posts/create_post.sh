#!/bin/bash

curl -X POST http://localhost:8000/api/posts/create -H "Content-Type: application/json" -d '{"user": "Slump Gorb", "title": "Test Post", "body": "postingtest"}'
