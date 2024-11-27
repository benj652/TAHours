#!/bin/bash

curl -X POST http://localhost:8000/api/cs-class/set-active/67478b875f6ec9602df1022a -H "Content-Type: application/json" -d '{"isActive": true}'