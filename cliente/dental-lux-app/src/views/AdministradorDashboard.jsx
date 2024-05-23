import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import api from '../api/api';

const AdministradorDashboard = () => {
  const [pacientes, setPacientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null); // Estado para el elemento a eliminar
  const [itemType, setItemType] = useState(''); // Estado para el tipo de elemento (paciente o empleado)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientesRes, empleadosRes] = await Promise.all([
          api.get('/pacientes'),
          api.get('/empleados')
        ]);
        setPacientes(pacientesRes.data);
        setEmpleados(empleadosRes.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar la información');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      if (itemType === 'paciente') {
        await api.delete(`/pacientes/${itemToDelete.id_paciente}`);
        setPacientes(pacientes.filter(p => p.id !== itemToDelete.id_paciente));
      } else if (itemType === 'empleado') {
        await api.delete(`/empleados/${itemToDelete.id_empleado}`);
        setEmpleados(empleados.filter(e => e.id !== itemToDelete.id_empleado));
      }
      setItemToDelete(null);
      setItemType('');
    } catch (error) {
      setError('Error al eliminar el elemento');
    }
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
        <div className="row mt-5">
          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card bg-primary text-white h-100">
              <div className="card-body"><i className="fas fa-users"></i> Gestionar Usuarios</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link" to="crear-empleado">Crear empleado</Link>
                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card bg-success text-white h-100">
              <div className="card-body"><i className="fas fa-user-tie"></i> Gestionar Empleados</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link" to="/administrador/empleados">Ir</Link>
                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card bg-warning text-white h-100">
              <div className="card-body"><i className="fas fa-calendar-alt"></i> Gestionar Citas</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link" to="/citas">Ir</Link>
                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-xl-12 mb-4">
            <div className="card">
              <div className="card-header">
                <i className="fas fa-users me-1"></i> Pacientes
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacientes.map((paciente) => (
                      <tr key={paciente.id_paciente}>
                        <td>{paciente.nombre} {paciente.apellidos}</td>
                        <td>{paciente.email}</td>
                        <td>{paciente.telefono}</td>
                        <td>
                          <button 
                            className="btn btn-danger btn-sm" 
                            title="Eliminar Paciente" 
                            data-bs-toggle="modal" 
                            data-bs-target="#deleteModal"
                            onClick={() => { setItemToDelete(paciente); setItemType('paciente'); }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                          <Link to={`/administrador/pacientes/${paciente.id_paciente}/editar`} className="btn btn-warning btn-sm ms-2" title="Editar Paciente">
                            <i className="fas fa-edit"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-xl-12 mb-4">
            <div className="card">
              <div className="card-header">
                <i className="fas fa-user-tie me-1"></i> Empleados
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empleados.map((empleado) => (
                      <tr key={empleado.id_empleado}>
                        <td>{empleado.nombre} {empleado.apellidos}</td>
                        <td>{empleado.email}</td>
                        <td>{empleado.telefono}</td>
                        <td>
                          <button 
                            className="btn btn-danger btn-sm" 
                            title="Eliminar Empleado" 
                            data-bs-toggle="modal" 
                            data-bs-target="#deleteModal"
                            onClick={() => { setItemToDelete(empleado); setItemType('empleado'); }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                          <Link to={`/administrador/empleados/${empleado.id_empleado}/editar`} className="btn btn-warning btn-sm ms-2" title="Editar Empleado">
                            <i className="fas fa-edit"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Confirmación */}
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Confirmar eliminación</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ¿Estás seguro de que quieres eliminar este {itemType}?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">Eliminar</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default AdministradorDashboard;
