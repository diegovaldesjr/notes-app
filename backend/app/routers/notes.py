from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import SessionLocal
from app.services.auth_service import get_current_user
from app.models.user import User
router = APIRouter()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@router.get("/api/notes")
async def get_notes(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  # Lógica para recuperar notas del usuario actual
  pass

# TODO: Agregar otros endpoints para crear, actualizar y eliminar notas