#!/bin/sh
cd /app/backend || exit
npm i
npm test
npm run start:watch
