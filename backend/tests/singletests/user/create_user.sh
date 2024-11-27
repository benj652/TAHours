#!/bin/bash

curl -X POST http://localhost:8000/api/user/get-or-create -H "Content-Type: application/json" -d '{"accessToken": "202020", "firstName": "Ben", "lastName": "Benson", "email": "bbbens98@colby.edu"}'
