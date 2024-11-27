#!/bin/bash

curl -X POST http://localhost:8000/api/user/change-profile-pic/67477838d6c2083f365002da -H "Content-Type: application/json" -d '{"profileUrl": "profile.jpg"}'