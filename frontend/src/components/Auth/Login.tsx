import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const { login, token } = authContext;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/')
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return ( 
  <Stack 
    component="div"
    sx={{ 
      backgroundColor: '#FFF9C4',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Stack
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: 4,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        gap: 2
      }}
    >
      <Typography variant="h3" mb={4}>Note App</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required fullWidth/>
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth/>
      <Stack
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: 2,
          marginTop: 2
        }}
      >
        <Button type="submit" variant="contained" color="warning" sx={{padding: "2 4"}}>Log In</Button>
        <Button variant="outlined" color="warning" onClick={() => navigate('/register')}>
          Registrar
        </Button>
      </Stack>
    </Stack>
  </Stack>
  );
};

export default Login;