FROM node:18-alpine AS builder

WORKDIR /app

COPY ./common ../common/
COPY ./backend/package-lock.json ./
COPY ./backend/package.json ./

RUN npm install

COPY ./backend/ ./

RUN npm run build

FROM node:16.15.1-alpine

WORKDIR /app

COPY --from=builder /app ./

ENTRYPOINT ["npm", "start"]
