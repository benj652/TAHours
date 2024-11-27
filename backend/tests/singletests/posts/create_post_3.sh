#!/bin/bash

curl -X POST http://localhost:8000/api/posts/create -H "Content-Type: application/json" -d '{"user": "John Johnson", "title": "232 shift cover", "body": "I am busy and need my 232 shift to be covored please help me"}'
