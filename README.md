# Notes App

Esta es una aplicación de notas que permite a los usuarios crear, leer, actualizar y eliminar notas. La aplicación está construida con React para el frontend y FastAPI para el backend. 

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instrucciones de Configuración](#instrucciones-de-configuración)
  - [Ejecutar Localmente](#ejecutar-localmente)
  - [Ejecutar con Docker](#ejecutar-con-docker)
- [Variables de Entorno](#variables-de-entorno)
- [Estrategia de Bloqueo Implementada](#estrategia-de-bloqueo-implementada)

## Características

- Crear, leer, actualizar y eliminar notas.
- Autenticación de usuario.
- Interfaz de usuario responsiva.

## Tecnologías

- **Frontend**: React, React Router, Material-UI
- **Backend**: FastAPI, Python, PostgreSQL
- **Docker**: Para la contenedorización

## Estructura del Proyecto

- `frontend/`: Contiene el frontend de la aplicación.
- `backend/`: Contiene el backend de la aplicación.


## Instrucciones de Configuración

### Ejecutar Localmente

#### Prerrequisitos

- Python (v3.7 o superior) para el backend
- PostgreSQL
- Node.js (v18 o superior)
- npm (Node package manager)

#### Backend

1. Navega al directorio del backend:

   ```bash
   cd backend
   ```

2. Crea un entorno virtual (opcional pero recomendado):

   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
   ```

3. Instala las dependencias:

   ```bash
   pip install -r requirements.txt
   ```

4. Inicia el servidor del backend:

   ```bash
   uvicorn app.main:app --reload
   ```

#### Frontend

1. Abre una nueva terminal y navega al directorio del frontend:

   ```bash
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo del frontend:

   ```bash
   npm start
   ```

### Ejecutar con Docker

#### Prerrequisitos

- Docker
- Docker Compose

#### Construir y Ejecutar

1. Navega a la raíz del proyecto (donde se encuentra `docker-compose.yml`):

   ```bash
   cd notes-app/frontend #Para el frontend
   cd notes-app/backend #Para el backend
   ```

2. Construye y ejecuta la aplicación usando Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Accede a la aplicación en tu navegador.

## Variables de Entorno

Puedes configurar las variables de entorno en el archivo `.env` ubicado en la raíz del proyecto. Aquí hay algunas variables de ejemplo:

### Backend
```bash
DB_USER=user
DB_PASSWORD=password
DB_NAME=dbname
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}
SECRET_KEY=your_secret_key
APP_URL=http://localhost:3000
```

### Frontend
```bash
REACT_APP_API_URL=http://localhost:8000
PORT=3000
```
## Estrategia de Bloqueo Implementada

La estrategia de bloqueo que se implemento fue el bloqueo optimista, ya que es el más adecuado para sistemas con alta concurrencia.

Este enfoque permite que múltiples transacciones lean los datos sin bloquearse entre sí. Solo se verifica la versión o el estado de los datos al momento de la actualización. Esto reduce la posibilidad de cuellos de botella, ya que las transacciones no se bloquean entre sí durante la lectura.

### Implementación

#### Versionado 

Se agrego un campo de versión a al modelo. Al actualizar, verifica que la versión en la base de datos coincida con la versión que el cliente tiene.

#### Manejo de Conflictos

Si hay un conflicto, informa al cliente y permite que vuelva a intentar la operación.


Espero les guste el proyecto. Feliz día!