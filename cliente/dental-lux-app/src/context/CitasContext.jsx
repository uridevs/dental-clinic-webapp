import { createContext, useState, useEffect } from "react";
import api from "../api/api";

const CitasContext = createContext();

export const CitasProvider = ({ children }) => {
  const [citas, setCitas] = useState([]);

  const fetchCitas = async () => {
    try {
      const { data } = await api.get("/citas/proximas", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCitas(data);
    } catch (error) {
      console.error("Error al cargar las citas", error);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  const updateCita = (updatedCita) => {
    setCitas((prevCitas) =>
      prevCitas.map((cita) =>
        cita.id === updatedCita.id ? { ...cita, ...updatedCita } : cita
      )
    );
  };

  const refreshCitas = fetchCitas;

  return (
    <CitasContext.Provider value={{ citas, updateCita, refreshCitas }}>
      {children}
    </CitasContext.Provider>
  );
};

export default CitasContext;
