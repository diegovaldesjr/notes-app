from fastapi import FastAPI
from app.routers import auth, notes
from app.database import engine, Base

app = FastAPI()

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(notes.router)