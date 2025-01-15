from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import note
from app.services.auth_service import get_current_user
from app.models.user import User
from app.models.note import Note
router = APIRouter()

@router.get("/api/notes")
async def get_notes(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  notes = db.query(Note).filter(Note.user_id == current_user.id).all()
  return notes

@router.post("/api/notes", response_model=note.Note, status_code=status.HTTP_201_CREATED)
async def create_note(note: note.NoteCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  db_note = Note(**note.dict(), user_id=current_user.id)
  db.add(db_note)
  db.commit()
  db.refresh(db_note)
  return db_note

@router.put("/api/notes/{note_id}", response_model=note.Note)
async def update_note(note_id: int, note: note.NoteCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  db_note = db.query(Note).filter(Note.id == note_id, Note.user_id == current_user.id).first()
  if not db_note:
    raise HTTPException(status_code=404, detail="Nota no encontrada")
  db_note.title = note.title
  db_note.content = note.content
  db.commit()
  db.refresh(db_note)
  return db_note

@router.delete("/api/notes/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_note(note_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  db_note = db.query(Note).filter(Note.id == note_id, Note.user_id == current_user.id).first()
  if not db_note:
    raise HTTPException(status_code=404, detail="Nota no encontrada")
  db.delete(db_note)
  db.commit()

@router.get("/api/notes/{note_id}", response_model=note.Note)
async def get_note(note_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  db_note = db.query(Note).filter(Note.id == note_id, Note.user_id == current_user.id).first()
  if not db_note:
    raise HTTPException(status_code=404, detail="Nota no encontrada")
  return db_note
