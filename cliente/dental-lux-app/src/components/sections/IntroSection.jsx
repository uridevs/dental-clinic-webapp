import SvgIcon from "../SvgIcon";

const IntroSection = () => {
  return (
    <section id="intro" className="position-relative">
      <div className="banner d-flex">

        <img
          src="/images/banner-image-3.png"
          alt="banner"
          className="img-fluid"

          
        />

        <div className="banner-content position-absolute">
          <span className="sub-heading bg-light py-2 px-4 mb-4 border-radius-30 text-uppercase d-inline-block text-cadet-blue fw-medium">
            <SvgIcon
              iconId="heart"
              className="primary-color me-2"
              style={{ width: "20px", height: "20px" }}
            />
            Vive tu vida
          </span>
          <h1 className="display-3 fw-bold text-light">
            Nosotros nos encargamos de tu salud dental
          </h1>
          <p id="first-intro-p" className="mt-2 mb-4 text-light">
            En Dental Luxe, priorizamos tu sonrisa, ofreciéndote un cuidado
            excepcional en un entorno exclusivo. Equipados con tecnología punta,
            ofrecemos servicios dentales personalizados para satisfacer tus
            necesidades específicas. Desde limpiezas rutinarias hasta
            procedimientos avanzados, cada tratamiento está diseñado para
            maximizar tu confort y resultados.
          </p>
          <p id="second-intro-p" className="mt-2 mb-4 text-light">
            Nos comprometemos no solo a mejorar tu salud dental, sino también a
            educarte sobre cómo mantener una sonrisa perfecta en casa. Visítanos
            y descubre el lujo de un cuidado dental superior donde tu bienestar
            es nuestra principal preocupación.
          </p>
        </div>

        {/* <div className="position-absolute d-flex justify-content-end gap-2 mt-2 w-100">
          <a
            href="#book-appointment"
            className="btn btn-medium btn-primary btn-pill text-uppercase text-center"
          >
            Pide cita
          </a>
          <a
            href="contacto.html"
            className="btn btn-medium btn-primary btn-pill text-uppercase"
          >
            Contáctanos
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default IntroSection;
