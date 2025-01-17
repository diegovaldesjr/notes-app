import NoteIcon from '@mui/icons-material/Note';
import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Notes } from '../../types';

const NotesList: React.FC<{notes: Notes[]}> = ({ notes }) => {
  const handleListItemClick = () => {

  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notes.map((note) => (
        <ListItemButton
          key={note.id}
          onClick={(event) => handleListItemClick()}
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