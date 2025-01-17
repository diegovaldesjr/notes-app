from pydantic import BaseModel

class NoteBase(BaseModel):
  title: str

class NoteCreate(NoteBase):
  content: str

class NoteUpdate(NoteBase):
  content: str
  version: int

class NoteItem(NoteBase):
  id: int
  title: str

class Note(NoteBase):
  id: int
  content: str
  version: int

  class Config:
    orm_mode = True
