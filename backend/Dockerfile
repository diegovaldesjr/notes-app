# Use the official Python image from the Docker Hub
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code
COPY ./app ./app

# Copy the tests directory
COPY ./tests ./tests

# Copy the .env file (if needed)
COPY .env .

# Copy the entrypoint script
COPY entrypoint.sh .

# Make the entrypoint script executable
RUN chmod +x entrypoint.sh

# Expose the port that FastAPI runs on
EXPOSE 8000

# Command to run the entrypoint script
CMD ["./entrypoint.sh"]