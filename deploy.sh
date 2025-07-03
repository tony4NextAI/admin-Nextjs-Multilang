#!/bin/bash

# get pm2 list
pm2 list
# Stop the last id in pm2 list
pm2 stop nextjs-3000
# Navigate to the project directory

# Run git pull to fetch the latest changes from the main branch
git pull origin main --force
# force merge to avoid conflicts
git merge origin/main --strategy-option theirs
# Install dependencies using yarn
yarn

# Run yarn build to build the project
yarn run build

# Start the application using pm2
pm2 start yarn --name "nextjs-3000" -- start -- -p 3000