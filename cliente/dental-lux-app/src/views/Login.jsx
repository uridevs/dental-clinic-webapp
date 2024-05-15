import Layout from "../layout/Layout";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to server)
  };

  return (
    <Layout>
    <div className="container mt-5"> {/* Added container and margin for better layout */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <fieldset className="card p-4">  {/* Semantic element for form group */}
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
              <a href="signup.html" className="link-primary">Registrate aquí</a>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Login;
