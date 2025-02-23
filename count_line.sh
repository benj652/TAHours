#!/bin/bash

# A simple script to see how many lines of code we currently have in this codebase.
find . -type d -name node_modules -prune -o \( -name "*.go" -o -name "*.ts" -o -name "*.tsx" \) -type f -print0 | xargs -0 cat | wc -l
