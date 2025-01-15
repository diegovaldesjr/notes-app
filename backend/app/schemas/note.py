from pydantic import BaseModel

class NoteBase(BaseModel):
  title: str
  content: str

class NoteUpdate(NoteBase):
  version: int

class Note(NoteBase):
  id: int
  version: int

  class Config:
    orm_mode = True
