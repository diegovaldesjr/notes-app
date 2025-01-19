import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Note } from '../types';

const useFetchNote = (id: number) => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const token = authContext?.token;
  const url = process.env.REACT_APP_API_URL;

  const fetchNoteById = async (id: number) => {
    try {
      const response = await axios.get(`${url}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNote(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate('/login');
      } else {
        console.error('Error fetching note:', error);
      }
    }
  };

  useEffect(() => {
    if (!token || !id) return;
    fetchNoteById(id);
  }, []);

  return { note, loading, error};
};

export default useFetchNote;