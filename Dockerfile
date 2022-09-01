# Dockerfile for dev purposes
# Attribution: created by James Chambers
# https://jameschambers.co.uk/nextjs-hot-reload-docker-development

FROM node:16-slim

RUN apt-get update
RUN apt-get install -y openssl

# Create the directory on the node image
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json /app

COPY .env /app

# Install dependencies in /app
RUN npm ci

# Copy the rest of our Next.js folder into /app
COPY . /app

# Ensure port 3000 is accessible to our system
EXPOSE 3000

RUN npx prisma generate

# Run yarn dev, as we would via the command line
CMD ["npm", "run", "dev"]