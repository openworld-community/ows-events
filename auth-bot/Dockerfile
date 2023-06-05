FROM node:16.15.1-alpine AS builder

WORKDIR /app

COPY ./common ../common/
COPY ./auth-bot/package-lock.json ./
COPY ./auth-bot/package.json ./

RUN npm install

COPY ./auth-bot/ ./

RUN npm run build

FROM node:16.15.1-alpine

WORKDIR /app

COPY --from=builder /app ./

ENTRYPOINT ["npm", "start"]
