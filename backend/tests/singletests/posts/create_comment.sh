#!/bin/bash

curl -X POST http://localhost:8000/api/posts/comment/6747888b6fa68cc40e7802b5 -H "Content-Type: application/json" -d '{"user": "Slump Gorb", "content": "comment test"}'
