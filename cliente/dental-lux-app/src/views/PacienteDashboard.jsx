import Layout from "../layout/Layout";

const PacienteDashboard = () => {
  return (
    <Layout>
      <nav className="sb-topnav navbar navbar-expand navbar-primary bg-primary">
        <a className="navbar-brand ps-3" href="index.html">
          Dental Luxe APP
        </a>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#!"
        >
          <i className="fas fa-bars"></i>
        </button>
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Buscar..."
              aria-label="Search"
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a className="dropdown-item" href="#!">
                  Configuración
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#!">
                  Historial
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#!">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Principal</div>
                <a className="nav-link" href="index.html">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  Panel de Control
                </a>
                <div className="sb-sidenav-menu-heading">Panel</div>
                <a className="nav-link" href="edit-profile.html">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-user-edit"></i>
                  </div>
                  Editar Perfil
                </a>
                <a className="nav-link" href="appointments.html">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  Historial
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Panel del paciente</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">
                  Bienvenido [Patient Name]
                </li>
              </ol>
              <div className="row">
                <div className="col-xl-6">
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-user me-1"></i>
                      Información personal
                    </div>
                    <div className="card-body">
                      <p>
                        <strong>Nombre:</strong> [Patient's Name]
                      </p>
                      <p>
                        <strong>Email:</strong> [Patient's Email]
                      </p>
                      <p>
                        <strong>Teléfono:</strong> [Patient's Phone]
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-calendar-alt me-1"></i>
                      Próximas Citas
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Doctor</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>[Fecha]</td>
                            <td>[Hora]</td>
                            <td>[Nombre del doctor]</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                title="Cancelar Cita"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Dental Luxe 2024
                </div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms & Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default PacienteDashboard;
