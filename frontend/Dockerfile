FROM node:16.15.1-alpine AS builder

WORKDIR /app

COPY ../common ../common/
COPY ./frontend/package-lock.json ./
COPY ./frontend/package.json ./

RUN npm install

COPY ./frontend/ ./
RUN npm run
RUN npm run build-prod

FROM node:16.15.1-alpine

WORKDIR /app

COPY --from=builder /app ./

ENTRYPOINT ["npm", "start"]
