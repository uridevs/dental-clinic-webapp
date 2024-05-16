import { Link } from "react-router-dom";

const Navbar = () => {

  const handleClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute('href').substring(1);
    const location = document.getElementById(target);
    location && location.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

  return (
    <nav
      id="primary-header"
      className="navbar navbar-expand-lg shadow-none"
      aria-label="navbar"
      height="30"
    >
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-primary"
          aria-controls="navbar-primary"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            className="navbar-icon mt-3 primary-color-500 bg-light"
            width="50"
            height="50"
          >
            <use xlinkHref="#navbar-icon"></use>
          </svg>
        </button>
        <div
          className="header-bottom collapse navbar-collapse bg-light border-radius-10 py-2"
          id="navbar-primary"
        >
          <ul className="navbar-nav justify-content-between me-auto mb-2 mb-lg-0">
            <Link to="#" onClick={handleClick} href="#about-us">Sobre nosotros</Link>
            <li className="nav-item ps-4 pe-4 border-right">
              <a
                className="nav-link text-dark active p-0 mt-3 mt-lg-0"
                aria-current="page"
                href="#intro"
              >
                Inicio
              </a>
            </li>
            <li className="nav-item ps-4 pe-4 border-right">
              <a className="nav-link text-dark p-0" href="#about-us">
                Grupo Dental Luxe
              </a>
            </li>
            <li className="nav-item ps-4 pe-4 border-right">
              <a className="nav-link text-dark p-0" href="#our-services">
                Especialidades
              </a>
            </li>

            <li className="nav-item ps-4 pe-4 border-right">
              <a className="nav-link text-dark p-0" href="#our-team">
                Equipo
              </a>
            </li>
            <li className="nav-item ps-4 pe-4 border-right">
              <a className="nav-link text-dark p-0" href="#testimonial">
                Testimonios
              </a>
            </li>
            <li className="nav-item ps-4 pe-4 border-right">
              <a className="nav-link text-dark p-0" href="#faqs">
                FAQ
              </a>
            </li>
            <li className="nav-item ps-4 pe-4 border-right">
              <a className="nav-link text-dark p-0" href="#book-appointment">
                Citas
              </a>
            </li>

            <li className="nav-item ps-4 pe-4">
              <a href="#latest-blog" className="nav-link text-dark fw-bold p-0">
                Blog Dental
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
