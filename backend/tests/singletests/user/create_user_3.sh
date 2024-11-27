#!/bin/bash

curl -X POST http://localhost:8000/api/user/get-or-create -H "Content-Type: application/json" -d '{"accessToken": "202024", "firstName": "Professor", "lastName": "Benjaminson", "email": "pbens98@colby.edu"}'
