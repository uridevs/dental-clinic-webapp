import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from "../layout/Layout";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import validator from 'validator';

const Registro = () => {
  const { login } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [repetirContrasena, setRepetirContrasena] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};
    if (!nombre) errors.nombre = 'El nombre es requerido';
    if (!apellidos) errors.apellidos = 'Los apellidos son requeridos';
    if (!dni) errors.dni = 'El DNI es requerido';
    else if (dni.length !== 9) errors.dni = 'DNI debe tener 9 caracteres';
    if (!telefono) errors.telefono = 'El teléfono es requerido';
    if (!email) errors.email = 'El correo electrónico es requerido';
    else if (!validator.isEmail(email)) errors.email = 'Correo electrónico inválido';
    if (!contrasena) errors.contrasena = 'La contraseña es requerida';
    else if (!validator.isStrongPassword(contrasena)) errors.contrasena = 'La contraseña no es suficientemente segura';
    if (contrasena !== repetirContrasena) errors.repetirContrasena = 'Las contraseñas no coinciden';
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateFields();
    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('/api/pacientes', { nombre, apellidos, dni, telefono, email, password: contrasena });
        setSuccess('Registrado correctamente. Redirigiendo...');
        setError('');

        // Logueamos al usuario automáticamente
        await login({ email, password: contrasena });

        // Redirigimos al usuario a su panel de usuario
        setTimeout(() => {
          navigate(`/paciente/${response.data.nuevoPaciente.id_paciente}`);
        }, 3000); // 3 segundos de retraso, si lo vemos largo modificar
      } catch (err) {
        setSuccess('');
        if (err.response && err.response.data.errors) {
          setError('Error en el registro. Por favor, revise los datos e intentelo de nuevo.');
        } else {
          console.error(err);
        }
      }
    }
  };

  return (
    <Layout>
      <section className="registro">
        <div className="px-4 py-5 px-md-5" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Dental Luxe App<br />
                  <span className="text-primary">Toda la información en la palma de tu mano</span>
                </h1>
                <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                  Regístrate para tener acceso a todos los datos sobre tus citas y tratamientos. Consulta disponibilidad, establece alarmas personalizadas para tus citas, participa en sorteos para conseguir tratamientos gratuitos... y mucho más!
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="formNombre">Nombre</label>
                            <input type="text" id="formNombre" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
                            {fieldErrors.nombre && <div className="text-danger">{fieldErrors.nombre}</div>}
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="formApellidos">Apellidos</label>
                            <input type="text" id="formApellidos" className="form-control" value={apellidos} onChange={e => setApellidos(e.target.value)} />
                            {fieldErrors.apellidos && <div className="text-danger">{fieldErrors.apellidos}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="formDni">DNI</label>
                        <input type="text" id="formDni" className="form-control" value={dni} onChange={e => setDni(e.target.value)} />
                        {fieldErrors.dni && <div className="text-danger">{fieldErrors.dni}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="formTelefono">Teléfono de contacto</label>
                        <input type="tel" id="formTelefono" className="form-control" value={telefono} onChange={e => setTelefono(e.target.value)} />
                        {fieldErrors.telefono && <div className="text-danger">{fieldErrors.telefono}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="formEmail">Correo electrónico</label>
                        <input type="email" id="formEmail" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                        {fieldErrors.email && <div className="text-danger">{fieldErrors.email}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="formContrasena">Contraseña</label>
                        <input type="password" id="formContrasena" className="form-control" value={contrasena} onChange={e => setContrasena(e.target.value)} />
                        {fieldErrors.contrasena && <div className="text-danger">{fieldErrors.contrasena}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="formRepetirContrasena">Repetir Contraseña</label>
                        <input type="password" id="formRepetirContrasena" className="form-control" value={repetirContrasena} onChange={e => setRepetirContrasena(e.target.value)} />
                        {fieldErrors.repetirContrasena && <div className="text-danger">{fieldErrors.repetirContrasena}</div>}
                      </div>

                      <div className="form-check d-flex justify-content-center mb-4">
                        <input className="" type="checkbox" value="" id="formNewsletter" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} />
                        <label className="form-check-label" htmlFor="formNewsletter">
                          Quiero recibir vuestra newsletter
                        </label>
                      </div>

                      {error && <div className="alert alert-danger">{error}</div>}
                      {success && <div className="alert alert-success">{success}</div>}
                      
                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Registrar
                      </button>

                      <div className="text-center">
                        <p>¿Ya tienes usuario? <small><Link to="/login">Haz login aquí</Link></small></p>
                        <div>
                          <button type="button" aria-label="Login with Facebook" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                          </button>
                          <button type="button" aria-label="Login with Google" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google"></i>
                          </button>
                          <button type="button" aria-label="Login with Twitter" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-twitter"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Registro;
