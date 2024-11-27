#!/bin/bash

curl -X POST http://localhost:8000/api/ta-queue/remove-ta/67478c155f6ec9602df1022c -H "Content-Type: application/json" -d '{"taId": "674787df6fa68cc40e7802b2", "classId":"674789216fa68cc40e7802b8"}'