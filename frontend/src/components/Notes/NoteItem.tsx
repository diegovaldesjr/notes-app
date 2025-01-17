import { Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, ListItemText, TextField } from '@mui/material';
import React from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
  const [open, setOpen] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(note.title);
  const [editedContent, setEditedContent] = React.useState(note.content);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    onEdit({ ...note, title: editedTitle, content: editedContent });
    handleClose();
  };

  const handleDelete = () => {
    onDelete(note.id);
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={note.title} secondary={note.content} />
        <Button onClick={handleClickOpen}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ListItem>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteItem;