import { Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import { AuthContext } from '../context/AuthContext';

const Note: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<any>(null);
  const { token } = authContext;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Typography variant="h6" my={4} paddingLeft={3}>Note</Typography>
    </>
  );
};

export default Note;