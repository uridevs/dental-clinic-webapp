import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import './Button.css'; // Importa el archivo CSS con el diseño del botón

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/registro';
  const isHomePage = location.pathname === '/';

  const handleAccountClick = () => {
    if (user) {
      if (user.role === 'paciente') {
        navigate(`/paciente/${user.idEspecifico}`);
      } else if(user.role ==='1'){
        navigate(`/administrador`);
      } else {
        navigate(`/empleado/${user.idEspecifico}`);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header id="header">
      <div className="header-top pt-4 pb-5">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <a className="navbar-brand" href="/">
                <img
                  src="/images/logo_dental_luxe_top.png"
                  alt="Dental Luxe Logo"
                  className="logo img-thumbnail"
                />
              </a>
            </div>
            <div className="col-lg-4 col-md-4 d-md-block d-sm-none">
              <ul className="contact-list d-flex justify-content-start flex-wrap list-unstyled m-0">
                <li className="pe-5 pe-lg-0 pe-xxl-5 pb-3 pb-lg-0">
                  <svg
                    className="location primary-color"
                    width="24"
                    height="24"
                  >
                    <use xlinkHref="#location" />
                  </svg>
                  C/ Recogidas Nº 272, Granada
                </li>
                <li className="ps-xl-3">
                  <svg className="phone primary-color" width="24" height="24">
                    <use xlinkHref="#phone" />
                  </svg>
                  (958) 3894521
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-end col-lg-4 col-md-4 col-sm-6 gap-2">
              {!isLoginOrRegister && (
                <>
                  <button className="button-19" onClick={handleAccountClick}>
                    {user ? "Mi área" : "Login"}
                  </button>
                  {user && <button className="btn btn-link text-danger p-0" onClick={logout} title="Logout">
                    <i className="fas fa-sign-out-alt fa-lg"></i>
                  </button>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isHomePage && <Navbar user={user} />} 
    </header>
  );
};

export default Header;
