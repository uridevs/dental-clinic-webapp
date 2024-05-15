import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();  // Creación del contexto

export const useAuth = () => useContext(AuthContext); // Definición del hook useAuth

export const AuthProvider = ({ children }) => {  // Proveedor del contexto que gestiona el estado
    const [authInfo, setAuthInfo] = useState({ isAuthenticated: false, user: null });

    const login = (user) => {
        setAuthInfo({ isAuthenticated: true, user });
    };

    const logout = () => {
        setAuthInfo({ isAuthenticated: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ authInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

