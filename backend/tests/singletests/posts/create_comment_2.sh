#!/bin/bash

curl -X POST http://localhost:8000/api/posts/comment/6747888d6fa68cc40e7802b6 -H "Content-Type: application/json" -d '{"user": "Professor Ben", "content": "Sure I can cover your shift my freind."}'
