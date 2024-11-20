#!/bin/bash

curl -X POST http://localhost:8000/api/posts/comment/673e2bd7db1ea17eb63cb003 -H "Content-Type: application/json" -d '{"user": "Slump Gorb", "content": "comment test"}'
