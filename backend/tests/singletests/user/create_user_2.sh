#!/bin/bash

curl -X POST http://localhost:8000/api/user/get-or-create -H "Content-Type: application/json" -d '{"accessToken": "202023", "firstName": "Benjamin", "lastName": "Benjaminson", "email": "bibens98@colby.edu"}'
