import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';

const EditarCita = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cita, setCita] = useState(null);
  const [doctores, setDoctores] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [selectedTratamiento, setSelectedTratamiento] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [notas, setNotas] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const { data } = await api.get(`/citas/${id}`);
        setCita(data);
        setFecha(data.inicio.split('T')[0]);
        setHora(data.inicio.split('T')[1].substring(0, 5));
        setSelectedEspecialidad(data.tratamiento.id_especialidad);
        setSelectedTratamiento(data.id_tipo_tratamiento);
        setSelectedDoctor(data.id_empleado);
        setNotas(data.notas || '');
        
        // Fetch tratamientos para la especialidad seleccionada
        const tratamientosData = await api.get(`/tratamientos/especialidad?id_especialidad=${data.tratamiento.id_especialidad}`);
        setTratamientos(tratamientosData.data);
      } catch (error) {
        console.error('Error fetching cita data:', error);
      }
    };

    const fetchDoctores = async () => {
      try {
        const { data } = await api.get('/empleados/doctores');
        setDoctores(data);
      } catch (error) {
        console.error('Error obteniendo doctores', error);
      }
    };

    const fetchEspecialidades = async () => {
      try {
        const { data } = await api.get('/especialidades');
        setEspecialidades(data);
      } catch (error) {
        console.error('Error obteniendo especialidades', error);
      }
    };

    fetchCita();
    fetchDoctores();
    fetchEspecialidades();
  }, [id]);

  const handleEspecialidadChange = async (especialidadId) => {
    setSelectedEspecialidad(especialidadId);
    try {
      const { data } = await api.get(`/tratamientos/especialidad?id_especialidad=${especialidadId}`);
      setTratamientos(data);
      setSelectedTratamiento('');
    } catch (error) {
      console.error('Error fetching treatments', error);
    }
  };

  const validateFields = () => {
    const errors = {};
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    if (!validator.isInt(String(selectedDoctor))) errors.selectedDoctor = 'Debe seleccionar un doctor válido';
    if (!validator.isInt(String(selectedTratamiento))) errors.selectedTratamiento = 'Debe seleccionar un tratamiento válido';
    if (!validator.isISO8601(fecha)) errors.fecha = 'Debe seleccionar una fecha válida';
    const selectedDate = new Date(`${fecha}T${hora}`);
    if (selectedDate < twoHoursLater) errors.fechaHora = 'Debe seleccionar una fecha y hora al menos dos horas después de la hora actual';
    if (!hora) errors.hora = 'Debe seleccionar una hora válida';
    return errors;
  };

  const handleVolver = () => {
    navigate('/citas');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors(fieldErrors);
      const errorMessages = Object.values(fieldErrors).join(', ');
      toast.error(`Por favor, corrija los errores en el formulario: ${errorMessages}`, {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return;
    }

    const inicio = new Date(`${fecha}T${hora}`);
    const fin = new Date(inicio);
    fin.setMinutes(inicio.getMinutes() + 30);

    const updatedCita = {
      id_paciente: cita.id_paciente,
      inicio: inicio.toISOString(),
      fin: fin.toISOString(),
      id_empleado: selectedDoctor,
      id_tipo_tratamiento: selectedTratamiento,
      notas: notas,
    };

    try {
      await api.put(`/citas/${id}`, updatedCita);
      toast.success('Cita actualizada con éxito. Redirigiendo...', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setTimeout(() => {
        if (user.role === 'paciente') {
          navigate(`/paciente/${user.idEspecifico}`);
        } else {
          navigate('/citas');
        }
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data || 'Error al actualizar la cita', {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  };

  if (!cita || !user) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <div className="container mt-5">
        <ToastContainer />
        <div className="text-center mb-4">
          <h1>Editar Cita</h1>
          <div className="d-flex justify-content-center gap-2 mb-4">
            <button className="btn btn-secondary" onClick={handleVolver}>
              Volver
            </button>
          </div>
        </div>
        <div className="card p-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">ID Cita</label>
                <input
                  type="text"
                  className="form-control"
                  value={cita.id}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">DNI del Paciente</label>
                <input
                  type="text"
                  className="form-control"
                  value={cita.paciente.dni}
                  disabled
                />
              </div>
              {cita.paciente && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{cita.paciente.nombre} {cita.paciente.apellidos}</h5>
                    <p className="card-text">Email: {cita.paciente.email}</p>
                    <p className="card-text">Teléfono: {cita.paciente.telefono}</p>
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Especialidad</label>
                <select
                  className="form-select"
                  onChange={(e) => handleEspecialidadChange(e.target.value)}
                  value={selectedEspecialidad}
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map(especialidad => (
                    <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
                      {especialidad.nombre_especialidad}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Tratamiento</label>
                <select
                  className="form-select"
                  onChange={(e) => setSelectedTratamiento(e.target.value)}
                  value={selectedTratamiento}
                  disabled={!selectedEspecialidad}
                >
                  <option value="">Seleccione un tratamiento</option>
                  {tratamientos.map(tratamiento => (
                    <option key={tratamiento.id_tipo_tratamiento} value={tratamiento.id_tipo_tratamiento}>
                      {tratamiento.nombre_tratamiento}
                    </option>
                  ))}
                </select>
                {fieldErrors.selectedTratamiento && <div className="text-danger">{fieldErrors.selectedTratamiento}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
                {fieldErrors.fecha && <div className="text-danger">{fieldErrors.fecha}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Hora de Inicio</label>
                <input
                  type="time"
                  className="form-control"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  step="1800" // Intervalos de 30 minutos
                  min="09:00"
                  max="21:00"
                />
                {fieldErrors.hora && <div className="text-danger">{fieldErrors.hora}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Doctor</label>
                <select
                  className="form-select"
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  value={selectedDoctor}
                >
                  <option value="">Seleccione un doctor</option>
                  {doctores.map(doctor => (
                    <option key={doctor.id_empleado} value={doctor.id_empleado}>
                      {doctor.nombre} {doctor.apellidos}
                    </option>
                  ))}
                </select>
                {fieldErrors.selectedDoctor && <div className="text-danger">{fieldErrors.selectedDoctor}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Notas</label>
                <textarea
                  className="form-control"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" title="enviar">Editar Cita</button>
              {alert.show && (
                <div className={`alert alert-${alert.type} mt-3`} role="alert">
                  {alert.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCita;
