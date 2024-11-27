#!/bin/bash

curl -X GET http://localhost:8000/api/user/get -H "Content-Type: application/json" -d '{"accessToken": "202024", "email": "pbens98@colby.edu"}'