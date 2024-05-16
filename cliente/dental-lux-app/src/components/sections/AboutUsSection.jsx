const AboutUsSection = () => {
  return (
    <section id="about-us" className="padding-large">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="counter-info text-center">
              <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                <span className="counter-prefix">+</span>
                <h5
                  className="timer display-4 fw-bold m-0"
                  data-to="5120"
                  data-speed="8000"
                >
                  600
                </h5>
              </div>
              <p className="counter-description">Pacientes Satisfechos</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="counter-info text-center">
              <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                <span className="counter-prefix">+ </span>
                <h5
                  className="timer display-4 fw-bold m-0"
                  data-to="5120"
                  data-speed="8000"
                >
                  2
                </h5>
              </div>
              <p className="counter-description">Centros propios</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="counter-info text-center">
              <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                <span className="counter-prefix">+</span>
                <h5
                  className="timer display-4 fw-bold m-0"
                  data-to="5120"
                  data-speed="8000"
                >
                  10
                </h5>
              </div>
              <p className="counter-description">Profesionales</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="counter-info text-center">
              <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                <span className="counter-prefix">+</span>
                <h5
                  className="timer display-4 fw-bold m-0"
                  data-to="5120"
                  data-speed="8000"
                >
                  15
                </h5>
              </div>
              <p className="counter-description">Años de experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
