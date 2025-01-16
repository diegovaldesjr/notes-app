from fastapi import FastAPI
from app.routers import auth, notes
from app.database import engine, Base

app = FastAPI(
  title="Notas API",
  description="API para gestionar notas con autenticación y manejo de concurrencia.",
  version="1.0.0",
)

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(notes.router)