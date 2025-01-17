import { Button, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import NoteForm from '../components/Notes/NoteForm';
import NoteList from '../components/Notes/NoteList';
import { AuthContext } from '../context/AuthContext';
import useNotes from '../hooks/useNotes';

const NotesPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  
  // Type guard to ensure authContext is defined
  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const { logout } = authContext;
  const { notes, addNote, deleteNote } = useNotes();

  const handleAddNote = (title: string, content: string) => {
    addNote(title, content);
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Notes
      </Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
      <NoteForm onSubmit={handleAddNote} />
      <NoteList notes={notes} onEdit={() => {}} onDelete={handleDeleteNote} />
    </Container>
  );
};

export default NotesPage;