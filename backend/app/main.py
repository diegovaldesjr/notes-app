from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, notes
from app.database import engine, Base
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()

app = FastAPI(
  title="Notas API",
  description="API para gestionar notas con autenticación y manejo de concurrencia.",
  version="1.0.0",
)

# Obtener la URL de la API desde el archivo .env
api_url = os.getenv('APP_URL', 'http://localhost:5000')

# Configura CORS
app.add_middleware(
  CORSMiddleware,
  allow_origins=[api_url],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(notes.router)