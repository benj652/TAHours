#!/bin/bash

curl -X POST http://localhost:8000/api/cs-class/create -H "Content-Type: application/json" -d '{"name": "CS152", "semester": "fall", "year": 2023}'
