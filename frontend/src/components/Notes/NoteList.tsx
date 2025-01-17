import { List } from '@mui/material';
import React from 'react';
import NoteItem from './NoteItem';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete }) => {
  return (
    <List>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </List>
  );
};

export default NoteList;