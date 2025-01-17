import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined');
  }

  const { token } = authContext;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>Welcome to the Home Page</div>
  );
};

export default Home;