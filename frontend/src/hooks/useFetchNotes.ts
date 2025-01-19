import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Notes } from '../types';

const useFetchNotes = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const token = authContext?.token;
  const url = process.env.REACT_APP_API_URL;

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${url}/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (authContext?.logout) {
          authContext.logout()
        }
        navigate('/login');
      } else {
        console.error('Error adding note:', error);
      }
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchNotes();
  }, []);

  return { notes, loading, error };
};

export default useFetchNotes;