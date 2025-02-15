from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Note(Base):
  __tablename__ = "notes"

  id = Column(Integer, primary_key=True, index=True)
  title = Column(String, index=True)
  content = Column(Text)
  user_id = Column(Integer, ForeignKey("users.id"))
  user = relationship("User")
  version = Column(Integer, default=1)
