#!/bin/bash

curl -X POST http://localhost:8000/api/ticket/resolve/674793071c82f3849375d848 -H "Content-Type: application/json" -d '{"taId": "674787df6fa68cc40e7802b2", "taNote": "Resolved issue"}'