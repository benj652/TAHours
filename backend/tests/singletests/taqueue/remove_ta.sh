#!/bin/bash

curl -X POST http://localhost:8000/api/ta-queue/remove-ta/67477e1dc86f38e20ba49b32 -H "Content-Type: application/json" -d '{"taId": "67477838d6c2083f365002da", "classId":"674771849a033724700d1749"}'