import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from "../layout/Layout";

const Registro = () => {
  // Estados para cada entrada de datos
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de envío aquí
    console.log({ nombre, apellidos, telefono, email, contrasena, newsletter });
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
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="formApellidos">Apellidos</label>
                            <input type="text" id="formApellidos" className="form-control" value={apellidos} onChange={e => setApellidos(e.target.value)} />
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="formTelefono">Teléfono de contacto</label>
                        <input type="tel" id="formTelefono" className="form-control" value={telefono} onChange={e => setTelefono(e.target.value)} />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="formEmail">Correo electrónico</label>
                        <input type="email" id="formEmail" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
      
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="formContrasena">Contraseña</label>
                        <input type="password" id="formContrasena" className="form-control" value={contrasena} onChange={e => setContrasena(e.target.value)} />
                      </div>
      
                      <div className="form-check d-flex justify-content-center mb-4">
                        <input className="form-check-input me-2" type="checkbox" value="" id="formNewsletter" checked={newsletter} onChange={e => setNewsletter(e.target.checked)} />
                        <label className="form-check-label" htmlFor="formNewsletter">
                          Quiero recibir vuestra newsletter
                        </label>
                      </div>
      
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
      
                          <button type="button" aria-label="Login with GitHub" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-github"></i>
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
