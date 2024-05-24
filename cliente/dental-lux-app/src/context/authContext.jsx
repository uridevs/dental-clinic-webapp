import { createContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin } from "../api/api";
import { jwtDecode } from "jwt-decode"; // Importación correcta sin llaves
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUser(JSON.parse(userData));
      }
    }
  }, [logout]);

  const login = async (credentials) => {
    try {
      const { data } = await apiLogin(credentials);
      const decodedToken = jwtDecode(data.token);
      const user = {
        ...decodedToken,
        idEspecifico: data.user.idEspecifico,
        role: decodedToken.role,
      };
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Error during login", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};