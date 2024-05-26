import { useEffect, useContext, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import api from "../api/api";
import Layout from "../layout/Layout";
import { AuthContext } from "../context/AuthContext";
import CitasContext from "../context/CitasContext";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const EmpleadoDashboard = () => {
  const { id } = useParams();
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);
  const { citas, updateCita, refreshCitas } = useContext(CitasContext);
  const [empleado, setEmpleado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCitaId, setSelectedCitaId] = useState(null);

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const { data } = await api.get(`/empleados/${id}`);
        setEmpleado(data);
      } catch (error) {
        setError("Error al cargar la información del empleado");
      }
    };

    const fetchCategorias = async () => {
      try {
        const { data } = await api.get("/categorias");
        setCategorias(data);
      } catch (error) {
        setError("Error al cargar las categorías profesionales");
      }
    };

    fetchEmpleado();
    fetchCategorias();
    refreshCitas();
    setLoading(false);
  }, [id, location]);

  const handleCancelClick = (citaId) => {
    setSelectedCitaId(citaId);
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  };

  const handleConfirmCancel = async () => {
    try {
      const { data } = await api.put(
        `/citas/${selectedCitaId}`,
        { estado: "Cancelada" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      updateCita(data);
      refreshCitas(); // Opcional dependiendo del diseño de tu aplicación
    } catch (error) {
      console.error("Error al cancelar la cita", error);
    }
  };

  const handleWaitClick = async (citaId) => {
    try {
      await api.put(
        `/citas/${citaId}`,
        { estado: "En espera" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      refreshCitas();
    } catch (error) {
      console.error("Error al cambiar el estado de la cita", error);
    }
  };

  const handleProcessClick = async (citaId) => {
    try {
      await api.put(
        `/citas/${citaId}`,
        { estado: "En proceso" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      refreshCitas();
    } catch (error) {
      console.error("Error al cambiar el estado de la cita", error);
    }
  };

  const handleFinishClick = async (citaId) => {
    try {
      await api.put(
        `/citas/${citaId}`,
        { estado: "Finalizada" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      refreshCitas();
    } catch (error) {
      console.error("Error al finalizar la cita", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const categoriaProfesional = categorias.find(
    (cat) => cat.id_categoria_profesional === empleado?.id_categoria_profesional
  )?.nombre_categoria;

  return (
    <Layout>
      <nav className="sb-topnav navbar navbar-expand navbar-primary bg-primary justify-content-between">
        <a className="navbar-brand ps-3" href="">
          Dental Luxe APP
        </a>

        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a className="dropdown-item" href="#!">
                  Configuración
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#!">
                  Historial
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={logout}
                  title="Logout"
                >
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="container">
        <div className="row mt-5">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <i className="fas fa-tachometer-alt"></i> Panel de Control
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to="/CambioPass"
                >
                  Cambiar contraseña
                </Link>
                <div className="small text-white">
                  {" "}
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <i className="fas fa-user-edit"></i> Perfil empleado
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to="/editarusuario"
                >
                  Editar datos
                </Link>
                <div className="small text-white">
                  {" "}
                  <i className="fas fa-angle-right"></i>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <i className="fas fa-calendar-check"></i> Gestión Citas
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Link className="small text-white" to="/citas">
                    Todas las citas
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link className="small text-white" to="/crearcita">
                    Crear cita
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card bg-secondary text-white mb-4">
              <div className="card-body">
                <i className="fas fa-calendar-alt me-1"></i>Gestión Pacientes
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
              <Link className="small text-white" to="/crear-paciente">
                    Registrar paciente
                  </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Panel del Empleado</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">
                  Hola {empleado && empleado.nombre}
                </li>
              </ol>
              <div className="row">
                <div className="col-xl-4">
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-user me-1"></i>
                      Información personal
                    </div>
                    <div className="card-body">
                      <p>
                        <strong>Nombre:</strong> {empleado && empleado.nombre}{" "}
                        {empleado && empleado.apellidos}
                      </p>
                      <p>
                        <strong>Puesto:</strong> {categoriaProfesional}
                      </p>
                      <p>
                        <strong>Email:</strong> {empleado && empleado.email}
                      </p>
                      <p>
                        <strong>Teléfono:</strong>{" "}
                        {empleado && empleado.telefono}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8">
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-calendar-alt me-1"></i>
                      Próximas Citas
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Paciente</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {citas.map((cita) => (
                            <tr key={cita.id}>
                              <td>
                                {format(parseISO(cita.inicio), "dd/MM/yyyy")}
                              </td>
                              <td>
                                {formatInTimeZone(
                                  parseISO(cita.inicio),
                                  "UTC",
                                  "HH:mm"
                                )}
                              </td>
                              <td>
                                {cita.paciente
                                  ? `${cita.paciente.nombre} ${cita.paciente.apellidos}`
                                  : "null"}
                              </td>
                              <td>
                                {cita.estado === "Cancelada" ? (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    disabled
                                  >
                                    Cancelada
                                  </button>
                                ) : cita.estado === "Finalizada" ? (
                                  <button
                                    className="btn btn-success btn-sm"
                                    disabled
                                  >
                                    Finalizada
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      className="btn btn-danger btn-sm me-2"
                                      title="Cancelar Cita"
                                      onClick={() => handleCancelClick(cita.id)}
                                    >
                                      <i className="fas fa-times"></i>
                                    </button>
                                    <button
                                      className="btn btn-warning btn-sm me-2"
                                      title="Pasar a sala de espera"
                                      onClick={() => handleWaitClick(cita.id)}
                                      disabled={
                                        cita.estado !== "Pendiente"
                                      }
                                    >
                                      <i className="fas fa-clock"></i>
                                    </button>
                                    {(user.role === "2" || user.role === "3") && (
                                      <>
                                        <button
                                          className="btn btn-info btn-sm me-2"
                                          title="Pasar a consulta"
                                          onClick={() => handleProcessClick(cita.id)}
                                          disabled={
                                            cita.estado !== "En Espera"
                                          }
                                        >
                                          <i className="fas fa-user-md"></i>
                                        </button>
                                        <button
                                          className="btn btn-success btn-sm"
                                          title="Finalizar Cita"
                                          onClick={() => handleFinishClick(cita.id)}
                                          disabled={
                                            cita.estado !== "En Proceso"
                                          }
                                        >
                                          <i className="fas fa-check"></i>
                                        </button>
                                      </>
                                    )}
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Dental Luxe 2024
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirmar cancelación
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              ¿Estás seguro de que quieres cancelar esta cita?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmCancel}
                data-bs-dismiss="modal"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmpleadoDashboard;
