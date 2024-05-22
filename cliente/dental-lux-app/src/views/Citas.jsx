import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { format } from "date-fns";

const Citas = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [citas, setCitas] = useState({
    futuras: [],
    pasadas: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [selectedCita, setSelectedCita] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/citas", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const now = new Date();

        let citasFiltradas = data;
        if (user.role === "paciente") {
          citasFiltradas = data.filter(
            (cita) => cita.id_paciente === user.idEspecifico
          );
          const pasadas = citasFiltradas.filter(
            (cita) => new Date(cita.inicio) <= now
          );
          setCitas({ futuras: [], pasadas });
        } else {
          const futuras = citasFiltradas.filter(
            (cita) => new Date(cita.inicio) > now
          );
          const pasadas = citasFiltradas.filter(
            (cita) => new Date(cita.inicio) <= now
          );
          setCitas({ futuras, pasadas });
        }
        setLoading(false);
      } catch (error) {
        setError("Error al cargar las citas");
        setLoading(false);
      }
    };
    fetchCitas();
  }, [user]);

  const handleEliminar = async (id) => {
    try {
      await api.delete(`/citas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCitas({
        futuras: citas.futuras.filter((cita) => cita.id !== id),
        pasadas: citas.pasadas.filter((cita) => cita.id !== id),
      });
      setAlert({
        show: true,
        message: "Cita eliminada correctamente.",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 5000);
    } catch (error) {
      setError("Error al eliminar la cita");
      setAlert({
        show: true,
        message: "Error al eliminar la cita.",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 5000);
    }
  };

  const handleEstadoChange = (cita, newEstado) => {
    setSelectedCita({ ...cita, estado: newEstado });
  };

  const handleGuardarEstado = async (cita) => {
    try {
      await api.put(
        `/citas/${cita.id}`,
        { estado: cita.estado },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCitas((prev) => {
        const key = new Date(cita.inicio) > new Date() ? "futuras" : "pasadas";
        return {
          ...prev,
          [key]: prev[key].map((c) =>
            c.id === cita.id ? { ...c, estado: cita.estado } : c
          ),
        };
      });
      setAlert({
        show: true,
        message: "Estado de la cita actualizado correctamente.",
        type: "success",
      });
      setSelectedCita(null);
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 5000);
    } catch (error) {
      setError("Error al guardar el estado de la cita");
      setAlert({
        show: true,
        message: "Error al guardar el estado de la cita.",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 5000);
    }
  };

  const handleVolver = () => {
    if (user.role === "paciente") {
      navigate(`/paciente/${user.idEspecifico}`);
    } else if (user.role === "1") {
      navigate("/Administrador");
    } else {
      navigate(`/empleado/${user.idEspecifico}`);
    }
  };

  const handleCrearCita = () => {
    navigate("/Crearcita");
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="mb-4">{user.role === "paciente" ? "Historial de Citas" : "Citas"}</h1>
          <div className="d-flex justify-content-center gap-2 mb-4">
            <button className="btn btn-secondary" onClick={handleVolver}>
              Volver
            </button>
            {user && user.role !== "paciente" && (
              <button className="btn btn-success" onClick={handleCrearCita}>
                Crear Cita
              </button>
            )}
          </div>
          {alert.show && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}
        </div>

        {["futuras", "pasadas"].map(
          (key) =>
            citas[key].length > 0 && (
              <div key={key}>
                <h2 className="text-center">
                  Citas {key.charAt(0).toUpperCase() + key.slice(1)}
                </h2>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th>Doctor</th>
                      <th>Tratamiento</th>
                      <th>Inicio</th>
                      <th>Fin</th>
                      <th>Estado</th>
                      {user.role !== "paciente" && <th>Acciones</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {citas[key].map((cita) => (
                      <tr key={cita.id}>
                        <td>
                          {cita.paciente
                            ? `${cita.paciente.nombre} ${cita.paciente.apellidos}`
                            : "N/A"}
                        </td>
                        <td>
                          {cita.doctor
                            ? `${cita.doctor.nombre} ${cita.doctor.apellidos}`
                            : "N/A"}
                        </td>
                        <td>
                          {cita.tratamiento
                            ? cita.tratamiento.nombre_tratamiento
                            : "N/A"}
                        </td>
                        <td>
                          {format(new Date(cita.inicio), "dd/MM/yyyy HH:mm")}
                        </td>
                        <td>{format(new Date(cita.fin), "dd/MM/yyyy HH:mm")}</td>
                        <td>
                          {user.role === "paciente" ? (
                            cita.estado
                          ) : (
                            <>
                              <select
                                className="form-select form-select-sm"
                                value={
                                  selectedCita && selectedCita.id === cita.id
                                    ? selectedCita.estado
                                    : cita.estado
                                }
                                onChange={(e) =>
                                  handleEstadoChange(cita, e.target.value)
                                }
                              >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Cancelada">Cancelada</option>
                                <option value="En Espera">En Espera</option>
                                <option value="En Progreso">En Progreso</option>
                                <option value="Completada">Completada</option>
                              </select>
                              <button
                                className="btn btn-success btn-sm ms-2"
                                onClick={() =>
                                  handleGuardarEstado(selectedCita || cita)
                                }
                              >
                                <i className="fas fa-save"></i>
                              </button>
                            </>
                          )}
                        </td>
                        {user.role === "1" && (
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleEliminar(cita.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        )}
      </div>
    </Layout>
  );
};

export default Citas;
