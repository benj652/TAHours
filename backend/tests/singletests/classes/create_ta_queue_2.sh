#!/bin/bash

curl -X POST http://localhost:8000/api/cs-class/create-ta-queue -H "Content-Type: application/json" -d '{"TAs": ["674787df6fa68cc40e7802b2"], "class": "67478b875f6ec9602df1022a", "directions": "go up"}'
