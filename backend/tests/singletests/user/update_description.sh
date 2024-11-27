#!/bin/bash

curl -X POST http://localhost:8000/api/user/update-description/674787e56fa68cc40e7802b3 -H "Content-Type: application/json" -d '{"description": "I am a professor"}'