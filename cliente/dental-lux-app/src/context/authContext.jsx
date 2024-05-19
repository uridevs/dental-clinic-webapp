// src/contexts/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { login as apiLogin } from "../api/api";
import {jwtDecode} from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token expirado, manejar la renovación del token si es necesario
        logout();
      } else {
        setUser(decodedToken);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await apiLogin(credentials);
      const decodedToken = jwtDecode(data.token);
      localStorage.setItem('token', data.token);
      setUser(decodedToken);
      return data;
    } catch (error) {
      console.error('Error during login', error);
      throw error
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
