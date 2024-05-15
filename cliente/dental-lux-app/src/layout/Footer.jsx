

const Footer = () => {
    return (
        <footer id="footer" className="overflow-hidden padding-large pb-0">
      <div className="container">
        <div className="row d-flex flex-wrap justify-content-between">
          <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
            <div className="footer-menu">
              <div className="contact-item">
                <img src="/images/logo_dental_luxe_top.png" alt="logo" className="pb-3 img-thumbnail" />
                <p>
                  Pon lo que más importa en las mejores manos
                </p>
              </div>
              
              
              <div className="contact-item">
                <p>
                  <svg className="location primary-color" width="25" height="25">
                    <use xlinkHref="#location"></use>
                  </svg>
                  <span>Recogidas 72, Granada, España</span>
                </p>
                <p>
                  <svg className="email primary-color" width="25" height="25">
                    <use xlinkHref="#email"></use>
                  </svg>
                  <a href="mailto:">Info@deluxedental.com</a>
                </p>
                <p>
                  <svg className="phone primary-color" width="25" height="25">
                    <use xlinkHref="#phone"></use>
                  </svg>
                  <span>958 - 389452</span>
                </p>
                <ul className="social-links list-unstyled d-flex mt-3">
                  <li>
                    <a href="#">
                      <svg
                        className="facebook text-primary-500 me-3"
                        width="25"
                        height="25"
                      >
                        <use xlinkHref="#facebook"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        className="twitter text-primary-500 me-3"
                        width="25"
                        height="25"
                      >
                        <use xlinkHref="#twitter"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        className="instagram text-primary-500 me-3"
                        width="25"
                        height="25"
                      >
                        <use xlinkHref="#instagram"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        className="youtube text-primary-500 me-3"
                        width="25"
                        height="25"
                      >
                        <use xlinkHref="#youtube"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        className="linkedin text-primary-500"
                        width="25"
                        height="25"
                      >
                        <use xlinkHref="#linkedin"></use>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
            <div className="footer-menu">
              <h5 className="widget-title pb-2 fw-semibold">Enlaces</h5>
              <ul className="menu-list list-unstyled">
                <li className="pb-2">
                  <a href="#intro">Inicio</a>
                </li>
                <li className="pb-2">
                  <a href="#about-us">Dental Luxe</a>
                </li>
                <li className="pb-2">
                  <a href="#our-services">Especialidades</a>
                </li>
                <li className="pb-2">
                  <a href="#book-appointment">Pide tu Cita</a>
                </li>
                <li className="pb-2">
                  <a href="#testimonial">Testimonios</a>
                </li>
                <li className="pb-2">
                  <a href="#our-team">Nuestro equipo</a>
                </li>
                <li className="pb-2">
                  <a href="#faqs">Dudas frecuentes</a>
                </li>
                <li className="pb-2">
                  <a href="#latest-blog">Luxe Blog</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
            <div className="footer-menu">
              <h5 className="widget-title fw-semibold">Horario de Apertura</h5>
              <table className="schedule">
                <tbody>
                  <tr className="d-flex justify-content-between border-bottom py-2">
                    <td>Lunes - Jueves </td>
                    <td className="text-primary">9:00 - 21:00 </td>
                  </tr>
                  <tr className="d-flex justify-content-between border-bottom py-2">
                    <td>Viernes - Sábados</td>
                    <td className="text-primary">09:00 - 15:00</td>
                  </tr>
                  <tr className="d-flex justify-content-between border-bottom py-2">
                    <td>Domingo</td>
                    <td className="text-primary">Solo Urgencias</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="d-md-flex text-center justify-content-between border-top mt-5 py-4"
        >
          <p>© 2024 Dental Luxe - All rights reserved</p>
        </div>
      </div>
    </footer>
    );
};

export default Footer;
