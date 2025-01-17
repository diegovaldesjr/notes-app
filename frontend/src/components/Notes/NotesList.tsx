import NoteIcon from '@mui/icons-material/Note';
import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Notes } from '../../types';

const NotesList: React.FC<{notes: Notes[]}> = ({ notes }) => {
  const navigate = useNavigate();

  const handleListItemClick = (id: number) => {
    navigate(`/note/${id}`)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notes.map((note) => (
        <ListItemButton
          key={note.id}
          onClick={() => handleListItemClick(note.id)}
      >
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText primary={note.title} />
      </ListItemButton>
      ))}
    </Box>
  );
};

export default NotesList;