import { useContext, useState, useEffect } from 'react';
import Layout from "../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Este efecto se ejecuta cuando el usuario se actualiza y existe un usuario válido.
    if (user) {
      if (user.role === 'paciente') {
        navigate(`/paciente/${user.idEspecifico}`);
      } else if (user.role === "1") {
        navigate(`/Administrador`);
      } else {
        navigate(`/empleado/${user.idEspecifico}`);
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validaciones simples en el frontend
    const errors = {};
    if (!email) errors.email = 'El correo electrónico es requerido';
    if (!password) errors.password = 'La contraseña es requerida';
    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await login({ email, password });
      } catch (error) {
        setError('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  };

  return (
    <Layout>
      <div className="container mt-5"> 
        <div className="row justify-content-center">
          <div className="col-md-6">
            <fieldset className="card p-4">  
              <legend className="card-title text-center">Login</legend>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Usuario:</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {fieldErrors.email && <div className="text-danger">{fieldErrors.email}</div>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {fieldErrors.password && <div className="text-danger">{fieldErrors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Entrar</button>
              </form>
              <div className="text-end mt-3">
                <p>¿No tienes cuenta aún? Regístrate <small><Link to="/Registro">aquí</Link></small></p> 
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
