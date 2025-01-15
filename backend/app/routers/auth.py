from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas, services
from app.database import get_db
from app.services.auth_service import create_user, create_access_token, verify_password
from datetime import timedelta
router = APIRouter()

@router.post("/auth/register", response_model=schemas.user.User)
async def register(user: schemas.user.UserCreate, db: Session = Depends(get_db)):
  existing_user = db.query(models.user.User).filter(models.user.User.username == user.username).first()
  if existing_user:
    raise HTTPException(status_code=400, detail="El nombre de usuario ya está registrado")
  return create_user(db=db, user=user)

@router.post("/auth/login")
async def login(user: schemas.user.UserCreate, db: Session = Depends(get_db)):
  db_user = db.query(models.user.User).filter(models.user.User.username == user.username).first()
  if not db_user or not verify_password(user.password, db_user.hashed_password):
    raise HTTPException(status_code=401, detail="Nombre de usuario o contraseña inválidos")
  
  access_token_expires = timedelta(minutes=30)
  access_token = create_access_token(data={"sub": db_user.username}, expires_delta=access_token_expires)
  return {"access_token": access_token, "token_type": "bearer"}
