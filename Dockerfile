FROM node:16.15.1-alpine

WORKDIR /app
RUN mkdir "backend"
RUN mkdir "frontend"

COPY ./frontend/public ./frontend/public/
COPY ./frontend/src ./frontend/src/
COPY ./frontend/*.ts ./frontend/
COPY ./frontend/*.json ./frontend/
COPY ./frontend/*.html ./frontend/

COPY ./backend/assets ./backend/assets/
COPY ./backend/src ./backend/src/
COPY ./backend/*.json ./backend/
COPY ./backend/*.ts ./backend/

COPY ./package.json ./

COPY ./common ./common/

RUN npm run i
RUN npm run prod:build

ENTRYPOINT ["npm", "run", "prod:run"]
