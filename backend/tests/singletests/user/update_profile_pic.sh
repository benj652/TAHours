#!/bin/bash

curl -X POST http://localhost:8000/api/user/change-profile-pic/674787df6fa68cc40e7802b2 -H "Content-Type: application/json" -d '{"profileUrl": "profile.jpg"}'