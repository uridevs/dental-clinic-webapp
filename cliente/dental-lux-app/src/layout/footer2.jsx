import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="overflow-hidden padding-large pb-0">
      <div className="container">
        <div className="row d-flex flex-wrap justify-content-between">
          <ContactInfo /> {/* New component for Contact Info */}
          <NavigationLinks /> {/* New component for Navigation Links */}
          <OpeningHours /> {/* New component for Opening Hours */}
        </div>
        <Copyright /> {/* New component for Copyright */}
      </div>
    </footer>
  );
};

const ContactInfo = () => (
  <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
    <div className="footer-menu">
      <img src="images/logo_dental_luxe_top.png" alt="logo" className="pb-3 img-thumbnail" />
      <p>Pon lo que más importa en las mejores manos</p>
      <ul className="contact-list list-unstyled d-flex mt-3">
        <li>
          <a href="mailto:Info@deluxedental.com">
            <svg className="email primary-color" width="25" height="25">
              <use xlink:href="#email"></use>
            </svg>
            Info@deluxedental.com
          </a>
        </li>
        <li>
          <a href="#">
            <svg className="phone primary-color" width="25" height="25">
              <use xlink:href="#phone"></use>
            </svg>
            958 - 389452
          </a>
        </li>
        <li>
          <svg className="location primary-color" width="25" height="25">
            <use xlink:href="#location"></use>
          </svg>
          <span>Recogidas 72, Granada, España</span>
        </li>
        {/* Social links can be a separate component if needed */}
      </ul>
    </div>
  </div>
);

const NavigationLinks = () => (
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
        {/* ... rest of the navigation links */}
      </ul>
    </div>
  </div>
);

const OpeningHours = () => (
  <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
    <div className="footer-menu">
      <h5 className="widget-title fw-semibold">Horario de Apertura</h5>
      <table className="schedule">
        {/* ... table content */}
      </table>
    </div>
  </div>
);

const Copyright = () => (
  <div className="d-md-flex text-center justify-content-between border-top mt-5 py-4">
    <p>© 2024 Dental Luxe - All rights reserved</p>
  </div>
);

export default Footer;
