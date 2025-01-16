#!/bin/sh

# Ejecutar las pruebas
echo "Running tests..."
pytest tests/

# Si las pruebas pasan, iniciar el servidor
echo "Starting the FastAPI server..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload