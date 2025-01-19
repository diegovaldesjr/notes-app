import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import Navbar from '../components/ui/Navbar';
import { AuthContext } from '../context/AuthContext';
import useDeleteNote from '../hooks/useDeleteNote';
import useFetchNote from '../hooks/useFetchNote';
import useSaveNote from '../hooks/useSaveNote';

const Note: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const { id } = useParams<{ id?: string }>();
  const { note, loading, error } = useFetchNote(Number(id));
  const { token } = authContext;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addNote, error: errorSave } = useSaveNote();
  const { deleteNote, error: errorDelete } = useDeleteNote();
  const navigate = useNavigate();

  const handleDeleteNote = async () => {
    try {
      if (!id) return;
      await deleteNote(Number(id));
      alert('Nota eliminada exitosamente.');
      navigate('/');
    } catch(error) {
      alert(errorDelete);
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
  
      if (!id) {
        await addNote(title, content);
      }
      alert('Nota guardada exitosamente.');
    } catch(error) {
      alert(errorSave);
    }
  }

  useEffect(() => {
    if (!note || !id) return;
    setTitle(note.title);
    setContent(note.content);
  }, [note, id]);

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
          <IconButton color="inherit" onClick={handleDeleteNote}>
            <DeleteIcon color='error' />
          </IconButton>
        </Stack>
        
        <TextareaAutosize 
          aria-label="Contenido" 
          minRows={10} 
          value={content}
          onChange={(e) => setContent(e.target.value)} 
          required
        />

        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="warning" onClick={handleSaveNote}>
          Guardar
        </Button>
      </Stack>
    </>
  );
};

export default Note;