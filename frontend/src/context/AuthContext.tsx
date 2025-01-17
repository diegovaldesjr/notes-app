import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

interface AuthContextType {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const url = process.env.REACT_APP_API_URL

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const response = await axios.post(`${url}/auth/login`, { username, password });
    const accessToken = response.data.access_token;
    setToken(accessToken);
    localStorage.setItem('token', accessToken);
  };

  const register = async (username: string, password: string) => {
    await axios.post(`${url}/auth/register`, { username, password });
  };

  const logout = async () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};