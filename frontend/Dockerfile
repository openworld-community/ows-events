FROM node:18-alpine AS builder

WORKDIR /app

COPY ./common ../common/
COPY ./frontend/package-lock.json ./
COPY ./frontend/package.json ./

RUN npm ci

COPY ./frontend/ ./

ARG NODE_ENV
ARG VITE_STAGE
ARG VITE_MODE

ENV NODE_ENV ${NODE_ENV}
ENV VITE_STAGE ${VITE_STAGE}
ENV VITE_MODE ${VITE_MODE}

RUN npm run postinstall
RUN npm run build-demo

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
