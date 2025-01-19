import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NotesList from '../components/Notes/NotesList';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import Navbar from '../components/ui/Navbar';
import { AuthContext } from '../context/AuthContext';
import useNotes from '../hooks/useFetchNotes';

const Home: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const { token } = authContext;
  const { notes, loading } = useNotes();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    <>
      <Navbar />
      <LoadingSpinner/>
    </>
  }

  return (
    <>
      <Navbar />
      <Typography variant="h6" my={4} paddingLeft={3}>Mis notas</Typography>
      {notes && (
        <NotesList notes={notes}/>
      )}
    </>
  );
};

export default Home;