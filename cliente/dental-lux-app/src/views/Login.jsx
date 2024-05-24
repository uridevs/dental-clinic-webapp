import { useContext, useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import validator from "validator";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess && user) {
      const timer = setTimeout(() => {
        if (user.role === "paciente") {
          navigate(`/paciente/${user.idEspecifico}`);
        } else if (user.role === "1") {
          navigate(`/Administrador`);
        } else {
          navigate(`/empleado/${user.idEspecifico}`);
        }
      }, 2000);

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [loginSuccess, user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!validator.isEmail(email)) {
      errors.email = "El correo electrónico no es válido";
    }

    if (!password) errors.password = "La contraseña es requerida";
    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await login({ email, password });
        setMessage("Login exitoso. Redirigiendo...");
        setLoginSuccess(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Correo electrónico o contraseña incorrectos");
        } else {
          setError(
            "Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde."
          );
        }
        setMessage("");
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
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico:
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {fieldErrors.email && (
                    <div className="text-danger">{fieldErrors.email}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña:
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  {fieldErrors?.password && (
                    <div className="text-danger">{fieldErrors.password}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Entrar
                </button>
              </form>
              {message && (
                <div className="mt-3 alert alert-success">{message}</div>
              )}
              {error && <div className="mt-3 alert alert-danger">{error}</div>}
              <div className="text-end mt-3">
                <p>
                  ¿No tienes cuenta aún? Regístrate{" "}
                  <small>
                    <Link to="/Registro">aquí</Link>
                  </small>
                </p>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
