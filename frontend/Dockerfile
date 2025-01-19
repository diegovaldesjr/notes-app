# Use a base image of Node.js
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the .env file
COPY .env ./

# Copy the rest of the application
COPY . .

# Build the application for production
RUN npm run build

# Use a base image of Nginx to serve the application
FROM nginx:alpine

# Copy the build files to the Nginx folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]