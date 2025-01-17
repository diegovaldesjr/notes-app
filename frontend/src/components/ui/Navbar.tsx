import LogoutIcon from '@mui/icons-material/Logout';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const navigate = useNavigate();
  const { logout } = authContext;

  const handleLogout = () => {
    if (authContext) {
      logout();
      navigate('/login');
    }
  };

  const handleCreateNote = () => {

  }

  return (
    <AppBar position="static" color='warning'>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Notes App
        </Typography>
        <IconButton color="inherit" onClick={handleCreateNote}>
          <NoteAddIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;