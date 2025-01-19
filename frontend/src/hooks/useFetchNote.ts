import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Note } from '../types';

const useFetchNote = (id: number) => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
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
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate('/login');
      } else {
        throw new Error('Error al obtener nota.');
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
      const newNote = response.data
      setNote(newNote);
      setLoading(false);
      navigate(`/note/${newNote.id}`);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (authContext?.logout) {
          authContext.logout()
        }
        navigate('/login');
      } else {
        throw new Error('Error al crear nota.');
      }
    }
  };

  const updateNote = async (id: number, title: string, content: string, version: number) => {
    try {
      const response = await axios.put(`${url}/api/notes/${id}`, { title, content, version }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newNote = response.data;
      setNote(newNote);
      setLoading(false);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (authContext?.logout) {
          authContext.logout()
        }
        navigate('/login');
      } else if (axios.isAxiosError(error) && error.response?.status === 409) {
        throw new Error('409');
      } else {
        throw new Error('Error al actualizar nota.');
      }
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`${url}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNote(null);
      setLoading(false);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate('/login');
      } else {
        throw new Error('Error al eliminar nota.');
      }
    }
  };

  useEffect(() => {
    if (!token || !id) return;
    fetchNoteById(id);
  }, []);

  return { note, loading, fetchNoteById, addNote, updateNote, deleteNote };
};

export default useFetchNote;