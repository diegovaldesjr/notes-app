import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const useDeleteNote = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const token = authContext?.token;
  const url = process.env.REACT_APP_API_URL;

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`${url}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  return { deleteNote, loading, error };
};

export default useDeleteNote;