import Layout from "../layout/Layout";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic 
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
                <label htmlFor="username" className="form-label">Usuario:</label>
                <input type="text" name="username" id="username" className="form-control" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input type="password" name="password" id="password" className="form-control" />
              </div>
              <div className="form-check mb-3">
                <input type="checkbox" name="remember-me" id="remember-me" className="form-check-input" />
                <label htmlFor="remember-me" className="form-check-label">Recordarme</label>
              </div>
              <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
            <div className="text-end mt-3">
            <p>¿No tienes cuenta aún? Registrate <small><Link to="/Registro">aquí</Link></small></p> 
            </div>
          </fieldset>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Login;
