import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/api";
import Layout from "../layout/Layout";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const PacienteDashboard = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCitaId, setSelectedCitaId] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const { data } = await api.get(`/pacientes/${id}`);
        setPaciente(data);
      } catch (error) {
        setError("Error al cargar la información del paciente");
      }
    };

    const fetchCitas = async () => {
      try {
        const { data } = await api.get(`/citas/paciente/${id}`);
        setCitas(data);
      } catch (error) {
        setError("Error al cargar las citas del paciente");
      }
    };

    fetchPaciente();
    fetchCitas();
    setLoading(false);
  }, [id]);

  const handleCancelClick = (citaId) => {
    setSelectedCitaId(citaId);
    const deleteModal = new bootstrap.Modal(
      document.getElementById("deleteModal")
    );
    deleteModal.show();
  };

  const handleConfirmCancel = async () => {
    try {
      await api.put(`/citas/${selectedCitaId}`, { estado: "Cancelada" });
      setCitas(
        citas.map((cita) =>
          cita.id === selectedCitaId ? { ...cita, estado: "Cancelada" } : cita
        )
      );
    } catch (error) {
      console.error("Error al cancelar la cita", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filtrar citas futuras
  const citasFuturas = citas.filter(cita => new Date(cita.inicio) > Date.now());

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
                <a className="dropdown-item" href="#!">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="container cards-container">
        <div className="row mt-5">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <i className="fas fa-tachometer-alt"></i> Panel de Control
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link" to="/CambioPass">
                  Cambiar contraseña
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <i className="fas fa-user-edit"></i> Perfil paciente{" "}
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link" to="/editarusuario">
                  Editar datos
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <i className="fas fa-calendar-check"></i> Historial
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link" to="/Citas">
                  Ver historial de citas
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-secondary text-white mb-4">
              <div className="card-body">
                <i className="fas fa-calendar-alt me-1"></i>Mis Citas
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to="/CrearCita"
                >
                  Pedir Cita
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
              <h1 className="mt-4">Panel del paciente</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">
                  Bienvenido {paciente && paciente.nombre}
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
                        <strong>Nombre:</strong> {paciente && paciente.nombre}{" "}
                        {paciente && paciente.apellidos}
                      </p>
                      <p>
                        <strong>Email:</strong> {paciente && paciente.email}
                      </p>
                      <p>
                        <strong>Teléfono:</strong>{" "}
                        {paciente && paciente.telefono}
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
                            <th>Doctor</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {citasFuturas.map((cita) => (
                            <tr key={cita.id}>
                              <td>
                                {format(parseISO(cita.inicio), "dd/MM/yyyy")}
                              </td>
                              <td>{formatInTimeZone(parseISO(cita.inicio), 'UTC', "HH:mm")}</td>
                              <td>
                                {cita.doctor
                                  ? `${cita.doctor.nombre} ${cita.doctor.apellidos}`
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
                                ) : (
                                  <button
                                    className="btn btn-danger btn-sm"
                                    title="Cancelar Cita"
                                    onClick={() => handleCancelClick(cita.id)}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
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
                Volver
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

export default PacienteDashboard;
