import axios from 'axios';
import { useEffect, useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
}

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const response = await axios.get('/api/notes');
    setNotes(response.data);
  };

  const addNote = async (title: string, content: string) => {
    const response = await axios.post('/api/notes', { title, content });
    setNotes((prev) => [...prev, response.data]);
  };

  const deleteNote = async (id: string) => {
    await axios.delete(`/api/notes/${id}`);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, addNote, deleteNote };
};

export default useNotes;