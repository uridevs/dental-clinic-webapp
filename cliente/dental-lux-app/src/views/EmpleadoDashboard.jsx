import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import Layout from "../layout/Layout";

const EmpleadoDashboard = () => {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const { data } = await api.get(`/empleados/${id}`);
        setEmpleado(data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar la información del empleado');
        setLoading(false);
      }
    };

    fetchEmpleado();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <nav className="sb-topnav navbar navbar-expand navbar-primary bg-primary">
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

      <div className="container">
       
        <div className="row mt-5">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body"><i className="fas fa-tachometer-alt"></i> Panel de Control</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  
                </a>
                <div className="small text-white">
                  {" "}
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body"><i className="fas fa-user-edit"></i> Editar Perfil </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                Editar Perfil
                </a>
                <div className="small text-white">
                  {" "}
                  <i className="fas fa-angle-right"></i>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body"><i className="fas fa-calendar-check"></i> Gestionar Citas</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                 Ir
                </a>
                <div className="small text-white">
                  {" "}
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body"><i className="fas fa-calendar-alt me-1"></i>Agenda</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  Ver
                </a>
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
                  Bienvenido {empleado.nombre}
                </li>
              </ol>
              <div className="row">
                <div className="col-xl-6">
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-user me-1"></i>
                      Información personal
                    </div>
                    <div className="card-body">
                      <p>
                        <strong>Nombre:</strong> {empleado.nombre}{" "}
                        {empleado.apellidos}
                      </p>
                      <p>
                        <strong>Email:</strong> {empleado.email}
                      </p>
                      <p>
                        <strong>Teléfono:</strong> {empleado.telefono}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
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
                          <tr>
                            <td>[Fecha]</td>
                            <td>[Hora]</td>
                            <td>[Nombre del doctor]</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                title="Cancelar Cita"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </td>
                          </tr>
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
    </Layout>
  );

};

export default EmpleadoDashboard;
