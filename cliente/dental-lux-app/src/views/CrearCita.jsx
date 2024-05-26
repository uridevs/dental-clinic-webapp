import { useState, useEffect, useContext } from 'react';
import Layout from '../layout/Layout';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';

const CrearCita = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dni, setDni] = useState('');
  const [paciente, setPaciente] = useState(null);
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
    const fetchDoctores = async () => {
      try {
        const { data } = await api.get('/empleados/doctores');
        setDoctores(data);
      } catch (error) {
        console.error('Error fetching doctors', error);
      }
    };

    const fetchEspecialidades = async () => {
      try {
        const { data } = await api.get('/especialidades');
        setEspecialidades(data);
      } catch (error) {
        console.error('Error fetching specialties', error);
      }
    };

    const fetchPacienteData = async () => {
      if (user && user.role === 'paciente') {
        try {
          const { data } = await api.get(`/pacientes/${user.idEspecifico}`);
          setDni(data.dni);
          setPaciente(data);
        } catch (error) {
          console.error('Error fetching patient data', error);
        }
      }
    };

    const today = new Date().toISOString().split('T')[0];
    setFecha(today);

    fetchDoctores();
    fetchEspecialidades();
    fetchPacienteData();
  }, [user]);

  const handleDniBlur = async (dniValue) => {
    try {
      const { data } = await api.get(`/pacientes/dni?dni=${dniValue || dni}`);
      setPaciente(data);
    } catch (error) {
      console.error('Error fetching patient data', error);
      setPaciente(null);
    }
  };

  const handleDniKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleDniBlur();
    }
  };

  const handleEspecialidadChange = async (especialidadId) => {
    setSelectedEspecialidad(especialidadId);
    try {
      const { data } = await api.get(`/tratamientos/especialidad?id_especialidad=${especialidadId}`);
      setTratamientos(data);
    } catch (error) {
      console.error('Error fetching treatments', error);
    }
  };

  const validateFields = () => {
    const errors = {};
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    if (!validator.isInt(selectedDoctor)) errors.selectedDoctor = 'Debe seleccionar un doctor válido';
    if (!validator.isInt(selectedTratamiento)) errors.selectedTratamiento = 'Debe seleccionar un tratamiento válido';
    if (!validator.isISO8601(fecha)) errors.fecha = 'Debe seleccionar una fecha válida';
    const selectedDate = new Date(`${fecha}T${hora}`);
    if (selectedDate < twoHoursLater) errors.fechaHora = 'Debe seleccionar una fecha y hora al menos dos horas después de la hora actual';
    if (!hora) errors.hora = 'Debe seleccionar una hora válida';
    return errors;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!paciente) {
      toast.error("Paciente no encontrado", {
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

    const nuevaCita = {
      id_paciente: paciente.id_paciente,
      inicio: inicio.toISOString(),
      fin: fin.toISOString(),
      id_empleado: selectedDoctor,
      id_tipo_tratamiento: selectedTratamiento,
      notas: `Nota paciente: ${notas}`,
    };

    try {
      await api.post('/citas', nuevaCita);
      toast.success("Cita creada con éxito. Redirigiendo...", {
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
      toast.error(error.response?.data || 'Error al crear la cita', {
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

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <div className="container mt-5">
        <ToastContainer />
        <div className="text-center mb-4">
          <h1>Crear Nueva Cita</h1>
          <div className="d-flex justify-content-center gap-2 mb-4">
            <button className="btn btn-secondary" onClick={handleVolver}>
              Volver
            </button>
          </div>
        </div>
        <div className="card p-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">DNI del Paciente</label>
                  <input
                    type="text"
                    className="form-control"
                    value={dni}
                    maxLength={9}
                    onChange={(e) => setDni(e.target.value)}
                    onBlur={() => handleDniBlur(dni)}
                    onKeyPress={handleDniKeyPress}
                    disabled={user.role === 'paciente'}
                  />
                  {fieldErrors.dni && <div className="text-danger">{fieldErrors.dni}</div>}
                  <label className="form-label mt-3">Doctor</label>
                  <select
                    className="form-select"
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    disabled={!paciente}
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
                {paciente && (
                  <div className="col-md-6 mb-3">
                    <div className="card bg-primary">
                      <div className="card-body">
                        <h5 className="card-title text-secondary">{paciente.nombre} {paciente.apellidos}</h5>
                        <p className="card-text text-secondary">Email: <span className='text-dark'>{paciente.email}</span></p>
                        <p className="card-text text-secondary">Teléfono: <span className='text-dark'>{paciente.telefono}</span></p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Especialidad</label>
                  <select
                    className="form-select"
                    onChange={(e) => handleEspecialidadChange(e.target.value)}
                    disabled={!paciente}
                  >
                    <option value="">Seleccione una especialidad</option>
                    {especialidades
                      .filter(especialidad => user.role !== 'paciente' || especialidad.id_especialidad === 1)
                      .map(especialidad => (
                        <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
                          {especialidad.nombre_especialidad}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Tratamiento</label>
                  <select
                    className="form-select"
                    onChange={(e) => setSelectedTratamiento(e.target.value)}
                    disabled={!paciente || !selectedEspecialidad}
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
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    disabled={!paciente}
                  />
                  {fieldErrors.fecha && <div className="text-danger">{fieldErrors.fecha}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Hora de Inicio</label>
                  <input
                    type="time"
                    className="form-control"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    step="1800"
                    min="09:00"
                    max="21:00"
                    disabled={!paciente}
                  />
                  {fieldErrors.hora && <div className="text-danger">{fieldErrors.hora}</div>}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label">Notas <small>(opcional)</small></label>
                  <textarea
                    className="form-control"
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    disabled={!paciente}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" title="enviar" disabled={!paciente || !selectedTratamiento}>Crear Cita</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CrearCita;
