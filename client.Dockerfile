FROM node:alpine

WORKDIR /client

# COPY package.json and yarn.lock files
COPY client/package.json ./
COPY client/yarn.lock ./

# COPY config files
COPY ./client/tsconfig.json ./

COPY ./client/public ./public
COPY ./client/src ./src

# Install dependencies
RUN yarn install

# Run and expose the client server on port 3000
EXPOSE 3000

# A command to start the client server
CMD yarn start
