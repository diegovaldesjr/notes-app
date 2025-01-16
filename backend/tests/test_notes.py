import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.models import User, Note
from app.database import get_db, SessionLocal
from sqlalchemy.orm import sessionmaker, declarative_base
from app.services.auth_service import hash_password

client = TestClient(app)

Base = declarative_base()

@pytest.fixture(scope="module")
def db_session():
  session = SessionLocal()
  try:
    yield session
  except Exception:
    session.rollback()
    raise
  finally:
    session.close()

@pytest.fixture
def create_user(db_session):
  # Verifica si el usuario ya existe
  existing_user = db_session.query(User).filter_by(username="testuser").first()
  if existing_user:
    db_session.query(Note).filter(Note.user_id == existing_user.id).delete()
    db_session.delete(existing_user)
    db_session.commit()
  user = User(username="testuser", hashed_password=hash_password("testpassword"))
  db_session.add(user)
  db_session.commit()
  db_session.refresh(user)
  return user

def test_login_user(create_user, db_session):
  response = client.post(
    "/auth/login",
    json={"username": "testuser", "password": "testpassword"}
  )
  assert response.status_code == 200
  assert "access_token" in response.json()
  
  return response.json()["access_token"]

def test_create_note(create_user, db_session):
  # Obtener el token de acceso
  token = test_login_user(create_user, db_session)

  # Usar el token en los encabezados
  headers = {
    "Authorization": f"Bearer {token}"
  }

  response = client.post(
    "/api/notes",
    json={"title": "Test Note", "content": "This is a test note."},
    headers=headers
  )
  assert response.status_code == 201
  assert response.json()["title"] == "Test Note"

def test_update_note(create_user, db_session):
  # Obtener el token de acceso
  token = test_login_user(create_user, db_session)

  # Usar el token en los encabezados
  headers = {
    "Authorization": f"Bearer {token}"
  }

  # Crear una nota primero
  note_response = client.post(
    "/api/notes",
    json={"title": "Note to Update", "content": "Content"},
    headers=headers
  )
  note_id = note_response.json()["id"]

  # Actualizar la nota
  response = client.put(
    f"/api/notes/{note_id}",
    json={"title": "Updated Note", "content": "Updated Content", "version": 1},
    headers=headers
  )
  assert response.status_code == 200
  assert response.json()["title"] == "Updated Note"

def test_concurrent_update(create_user, db_session):
  # Obtener el token de acceso
  token = test_login_user(create_user, db_session)

  # Usar el token en los encabezados
  headers = {
    "Authorization": f"Bearer {token}"
  }
  # Crear una nota primero
  note_response = client.post(
    "/api/notes",
    json={"title": "Concurrent Note", "content": "Content"},
    headers=headers
  )
  note_id = note_response.json()["id"]

  # Simular dos actualizaciones concurrentes
  response1 = client.put(
    f"/api/notes/{note_id}",
    json={"title": "First Update", "content": "First Content", "version": 1},
    headers=headers
  )
  response2 = client.put(
    f"/api/notes/{note_id}",
    json={"title": "Second Update", "content": "Second Content", "version": 1},
    headers=headers
  )

  # Verificar que la primera actualización fue exitosa
  assert response1.status_code == 200
  assert response1.json()["title"] == "First Update"

  # Verificar que la segunda actualización falló debido a un conflicto
  assert response2.status_code == 409
  assert response2.json()["detail"] == "Conflicto de actualización: hay otra actualización pendiente."