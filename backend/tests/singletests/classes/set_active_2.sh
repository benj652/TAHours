#!/bin/bash

curl -X POST http://localhost:8000/api/cs-class/set-active/674789216fa68cc40e7802b8 -H "Content-Type: application/json" -d '{"isActive": true}'