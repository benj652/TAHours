#!/bin/bash

curl -X POST http://localhost:8000/api/user/update-description/67477838d6c2083f365002da -H "Content-Type: application/json" -d '{"description": "I am a professor"}'