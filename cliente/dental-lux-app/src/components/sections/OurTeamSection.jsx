const OurTeamSection = () => {
  return (
    <section id="our-team" className="padding-large">
      <div className="container">
        <div className="row">
          <div className="display-header mb-5">
            <h2 className="display-5 fw-bold text-dark">Nuestro Equipo</h2>
          </div>
          <div className="team-content">
            <div className="swiper team-swiper">
              <div className="swiper-wrapper pb-5">
                <div className="swiper-slide">
                  <div className="team-member d-flex align-items-center">
                    <div className="col-md-6">
                      <div className="image-holder me-4 mb-4">
                        <img
                          src="images/team-item.jpg"
                          alt="team member"
                          className="border-radius-10 img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="member-info">
                        <h3 className="fs-4 fw-bold text-dark">
                          Dra. María Nofuentes
                        </h3>
                        <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">
                          Odontóloga
                        </span>
                        <p>
                          Licenciada en Odontología por la Universidad Europea
                          de Madrid. Cuenta con casi dos décadas de experiencia
                          en las que ha compartido...{" "}
                          <a href="#">
                            <small>Leer más</small>
                          </a>
                        </p>
                        <ul className="social-links list-unstyled d-flex">
                          <li>
                            <a href="#">
                              <svg
                                className="facebook text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#facebook" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="twitter text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#twitter" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="instagram text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#instagram" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="youtube text-primary-500"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#youtube" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="team-member d-flex align-items-center">
                    <div className="col-md-6">
                      <div className="image-holder me-4 mb-4">
                        <img
                          src="images/team-item1.jpg"
                          alt="team member"
                          className="border-radius-10 img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="member-info">
                        <h3 className="fs-4 fw-bold text-dark">
                          Dr. Zacarías Brown
                        </h3>
                        <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">
                          CIRUJANO
                        </span>
                        <p>
                          Cirujano maxilofacial con 30 años de experiencia.
                          Formado en la prestigiosa Universidad de Granada
                          (UGR), el Dr. Brown ha perfeccionado su arte y técnica
                          a través...{" "}
                          <a href="#">
                            <small>Leer más</small>
                          </a>
                        </p>
                        <ul className="social-links list-unstyled d-flex">
                          <li>
                            <a href="#">
                              <svg
                                className="facebook text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#facebook" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="twitter text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#twitter" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="instagram text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#instagram" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="youtube text-primary-500"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#youtube" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="team-member d-flex align-items-center">
                    <div className="col-md-6">
                      <div className="image-holder me-4 mb-4">
                        <img
                          src="images/team-item2.jpg"
                          alt="team member"
                          className="border-radius-10 img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="member-info">
                        <h3 className="fs-4 fw-bold text-dark">
                          Dra. Isabel Lozano
                        </h3>
                        <span className="text-uppercase fs-6 text-cadet-blue pb-2 d-block">
                          Ortodoncista
                        </span>
                        <p>
                          Renombrada ortodoncista con más de 12 años de
                          experiencia. Graduada por la UCM, donde también
                          completó un máster con especialización en Ortodoncia.
                          Su formación abarca técnicas avanzadas de ortodoncia
                          invisible...{" "}
                          <a href="#">
                            <small>Leer más</small>
                          </a>
                        </p>
                        <ul className="social-links list-unstyled d-flex">
                          <li>
                            <a href="#">
                              <svg
                                className="facebook text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#facebook" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="twitter text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#twitter" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="instagram text-primary-500 me-4"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#instagram" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                className="youtube text-primary-500"
                                width="30"
                                height="30"
                              >
                                <use xlinkHref="#youtube" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;
