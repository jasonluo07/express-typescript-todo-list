# Use the official image as a parent image.
FROM node:16

# Create and set the working directory.
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Specify the port number the container should expost
EXPOSE 8080

# Start the app
CMD ["yarn", "start"]
