#!/bin/bash

curl -X POST http://localhost:8000/api/posts/comment/67476ee570d63a1cc66f239c -H "Content-Type: application/json" -d '{"user": "Professor Ben", "content": "Sure I can cover your shift my freind."}'
