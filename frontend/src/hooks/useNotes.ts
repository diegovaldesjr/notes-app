import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Notes } from '../types';

const useNotes = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
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
    } catch (error) {
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

  const addNote = async (title: string, content: string) => {
    try {
      const response = await axios.post(`${url}/api/notes`, { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prev) => [...prev, response.data]);
    } catch (error) {
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

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`${url}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
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

  return { notes, addNote, deleteNote };
};

export default useNotes;