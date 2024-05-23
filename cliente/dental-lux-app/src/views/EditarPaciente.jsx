import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import api from '../api/api';

const EditarPaciente = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState({ nombre: '', apellidos: '', email: '', telefono: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const { data } = await api.get(`/pacientes/${id}`);
        setPaciente(data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar la información del paciente');
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pacientes/${id}`, paciente);
      navigate('/administrador');
    } catch (error) {
      setError('Error al actualizar la información del paciente');
    }
  };

  const handleVolver = () => {
    navigate("/Administrador");
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
          <div className="d-flex justify-content-center gap-2 mb-4">
            <button className="btn btn-secondary" onClick={handleVolver}>
              Volver
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <fieldset className="card p-4">
              <legend className="card-title text-center">Editar Paciente</legend>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="form-control"
                    value={paciente.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="apellidos" className="form-label">Apellidos:</label>
                  <input
                    type="text"
                    name="apellidos"
                    id="apellidos"
                    className="form-control"
                    value={paciente.apellidos}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={paciente.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono:</label>
                  <input
                    type="text"
                    name="telefono"
                    id="telefono"
                    className="form-control"
                    value={paciente.telefono}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditarPaciente;
