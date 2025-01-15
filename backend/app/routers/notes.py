from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import SessionLocal

router = APIRouter()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@router.get("/api/notes")
async def get_notes(db: Session = Depends(get_db)):
  # Lógica para recuperar notas
  pass

# TODO: Agregar otros endpoints para crear, actualizar y eliminar notas