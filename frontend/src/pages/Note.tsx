import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Stack, TextareaAutosize, TextField } from '@mui/material';
import DOMPurify from 'dompurify';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import Navbar from '../components/ui/Navbar';
import { AuthContext } from '../context/AuthContext';
import useFetchNote from '../hooks/useFetchNote';

const Note: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const { id } = useParams<{ id?: string }>();
  const { note, loading, fetchNoteById, addNote, updateNote, deleteNote } = useFetchNote(Number(id));
  const { token } = authContext;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleDeleteNote = async () => {
    try {
      if (!id) return;
      const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta nota?");
      if (!confirmDelete) return;
      
      await deleteNote(Number(id));
      navigate('/');
    } catch(e) {
      alert(e);
    }
  }

  const handleSaveNote = async () => {
    try {
      if (!title.trim()) {
        alert('El título no puede estar vacío');
        return;
      }
  
      if (!content.trim()) {
        alert('El contenido de la nota no puede estar vacío');
        return;
      }

      // Sanitiza los inputs antes de enviarlos
      const sanitizedTitle = DOMPurify.sanitize(title);
      const sanitizedContent = DOMPurify.sanitize(content);
      
      if (!id) {
        await addNote(sanitizedTitle, sanitizedContent);
      }
      if (id && note) {
        await updateNote(Number(id), sanitizedTitle, sanitizedContent, note.version)
      }
      alert('Nota guardada exitosamente.');
    } catch(e: any) {
      if (e.message !== '409') {
        alert(e);
        return;
      }
      const confirmDelete = window.confirm('Conflicto de actualización: hay otra actualización pendiente.\n\n' +
        'Desea actualizar?\n\n' +
        'Consejo: asegúrate de guardar los cambios hechos porque se perderán al actualizar.');
      if(confirmDelete) {
        await fetchNoteById(Number(id));
      }
    }
  }

  useEffect(() => {
    if (id && note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [id, note]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading && id) {
    <>
      <Navbar />
      <LoadingSpinner/>
    </>
  }

  return (
    <>
      <Navbar />
      <Stack 
        component="div"
        padding={4}
        gap={4}
      >
        <Stack 
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TextField 
            label="Título" 
            variant="standard" 
            color="warning" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
          {id && (
            <IconButton color="inherit" onClick={handleDeleteNote}>
              <DeleteIcon color='error' />
            </IconButton>
          )}
        </Stack>
        
        <TextareaAutosize 
          aria-label="Contenido" 
          minRows={10} 
          value={content}
          onChange={(e) => setContent(e.target.value)} 
          required
        />

        <Button variant="contained" color="warning" onClick={handleSaveNote}>
          Guardar
        </Button>
      </Stack>
    </>
  );
};

export default Note;