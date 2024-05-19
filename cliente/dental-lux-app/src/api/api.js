// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // REVISAR para producción

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para añadir el token JWT a las solicitudes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (credentials) => api.post('/login', credentials);
export const getPacientes = () => api.get('/pacientes');
// Añadir más funciones para manejar otras rutas 

export default api;
