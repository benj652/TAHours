#!/bin/bash

curl -X POST http://localhost:8000/api/cs-class/create-ta-queue -H "Content-Type: application/json" -d '{"TAs": ["67477838d6c2083f365002da"], "class": "CS333", "directions": "go up"}'