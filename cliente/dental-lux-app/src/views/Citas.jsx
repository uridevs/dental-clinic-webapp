import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';

const Citas = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [citas, setCitas] = useState({
    futuras: [],
    pasadas: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCita, setSelectedCita] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const { data } = await api.get('/citas');
        const now = new Date();
        const futuras = data.filter(cita => new Date(cita.inicio) > now);
        const pasadas = data.filter(cita => new Date(cita.inicio) <= now);
        setCitas({ futuras, pasadas });
        setLoading(false);
      } catch (error) {
        setError('Error al cargar las citas');
        setLoading(false);
      }
    };
    fetchCitas();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await api.delete(`/citas/${id}`);
      setCitas({
        futuras: citas.futuras.filter(cita => cita.id !== id),
        pasadas: citas.pasadas.filter(cita => cita.id !== id)
      });
    } catch (error) {
      setError('Error al eliminar la cita');
    }
  };

  const handleEstadoChange = (cita, newEstado) => {
    const updatedCitas = citas[cita.inicio > new Date() ? 'futuras' : 'pasadas'].map(c => {
      if (c.id === cita.id) {
        return { ...c, estado: newEstado };
      }
      return c;
    });
    if (cita.inicio > new Date()) {
      setCitas(prev => ({ ...prev, futuras: updatedCitas }));
    } else {
      setCitas(prev => ({ ...prev, pasadas: updatedCitas }));
    }
  };

  const handleGuardarEstado = async (cita) => {
    try {
      await api.put(`/citas/${cita.id}`, { estado: cita.estado });
    } catch (error) {
      setError('Error al guardar el estado de la cita');
    }
  };

  const handleVolver = () => {
    if (user.role === 'paciente') {
      navigate(`/paciente/${user.idEspecifico}`);
    } else if (user.role === '1') {
      navigate('/Administrador');
    } else {
      navigate(`/empleado/${user.idEspecifico}`);
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
        <div className="text-center">
          <h1 className="mb-4">Citas</h1>
          <button className="btn btn-secondary mb-4" onClick={handleVolver}>Volver</button>
        </div>

        {['futuras', 'pasadas'].map(key => (
          <div key={key}>
            <h2 className="text-center">Citas {key.charAt(0).toUpperCase() + key.slice(1)}</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Doctor</th>
                  <th>Tratamiento</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {citas[key].map(cita => (
                  <tr key={cita.id}>
                    <td>{cita.paciente ? `${cita.paciente.nombre} ${cita.paciente.apellidos}` : 'N/A'}</td>
                    <td>{cita.doctor ? `${cita.doctor.nombre} ${cita.doctor.apellidos}` : 'N/A'}</td>
                    <td>{cita.tratamiento ? cita.tratamiento.nombre_tratamiento : 'N/A'}</td>
                    <td>{format(new Date(cita.inicio), 'dd/MM/yyyy HH:mm')}</td>
                    <td>{format(new Date(cita.fin), 'dd/MM/yyyy HH:mm')}</td>
                    <td>
                      {user.role !== 'paciente' && (
                        <>
                          <select
                            className="form-select form-select-sm"
                            value={cita.estado}
                            onChange={(e) => handleEstadoChange(cita, e.target.value)}
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Cancelada">Cancelada</option>
                            <option value="En Espera">En Espera</option>
                            <option value="En Progreso">En Progreso</option>
                            <option value="Completada">Completada</option>
                          </select>
                          <button
                            className="btn btn-success btn-sm ms-2"
                            onClick={() => handleGuardarEstado(cita)}
                          >
                            <i className="fas fa-save"></i>
                          </button>
                        </>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(cita.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      </div>
    </Layout>
  );
};

export default Citas;
