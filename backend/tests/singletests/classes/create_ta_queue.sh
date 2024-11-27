#!/bin/bash

curl -X POST http://localhost:8000/api/cs-class/create-ta-queue -H "Content-Type: application/json" -d '{"TAs": ["674787df6fa68cc40e7802b2"], "class": "674789216fa68cc40e7802b8", "directions": "go up"}'
