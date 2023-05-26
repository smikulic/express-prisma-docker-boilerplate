FROM node:alpine

WORKDIR /server

# COPY package.json and yarn.lock files
COPY server/package.json ./
COPY server/yarn.lock ./

# generated prisma files
COPY server/prisma ./prisma/

# COPY ENV variable
COPY  server/.env ./

# COPY config files
COPY server/tsconfig.json ./
COPY server/config ./config

# COPY src
COPY server/src ./src

# Install dependencies
RUN yarn install

# Generate prisma client
RUN npx prisma generate

# RUN prisma db migrations
RUN npx prisma migrate dev

# Run and expose the server on port 8000
EXPOSE 8000

# A command to start the server
CMD yarn start
