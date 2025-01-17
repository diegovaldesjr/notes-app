import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface NoteFormProps {
  onSubmit: (title: string, content: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} required multiline rows={4} />
      <Button type="submit">Add Note</Button>
    </form>
  );
};

export default NoteForm;