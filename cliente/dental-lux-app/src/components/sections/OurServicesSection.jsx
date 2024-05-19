const OurServicesSection = () => {
  return (
    <section id="our-services">
      <div className="container">
        <div
          className="row "
          style={{
            backgroundImage: `url(${"public/images/services-bg.jpg"})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            maxWidth: "width: 100%",
          }}
        >
          <div className="col">
            <div className="display-header text-white d-flex flex-wrap justify-content-between padding-medium">
              <div className="col-lg-5 col-md-6 col-sm-12">
                <h2 className="text-white">
                  Los mejores especialistas en cada area para satisfacer tus
                  necesidades
                </h2>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p className="text-white">
                  Un equipo multidisciplinar siempre a la vanguardia, con el
                  único propósito de brindarte el mejor servicio.
                </p>
                <p className="text-white">
                  Cada miembro de nuestro equipo se especializa en diferentes
                  áreas de la odontología, desde estética dental hasta
                  ortodoncia y cirugía, asegurando un enfoque integral y
                  personalizado.
                </p>
                <p className="text-white">
                  En Dental Luxe, tu sonrisa es nuestra pasión.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 pb-3">
            <div className="icon-box p-4 bg-light border-radius-10 text-center">
              <div className="icon-box-icon">
                <svg
                  className="home-thermometer mt-3 primary-color-500"
                  width="50"
                  height="50"
                >
                  <use xlinkHref="#dent-chair"></use>
                </svg>
              </div>
              <div className="icon-box-content">
                <h3 className="card-title py-2">Odontología General</h3>
                <p>Cuidado Integral para cada Sonrisa</p>
                <p>
                  Descubre nuestra gama completa de servicios dentales, diseñada
                  para mantener tu sonrisa saludable y radiante. Desde limpiezas
                  hasta tratamientos preventivos.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 pb-3">
            <div className="icon-box p-4 bg-light border-radius-10 text-center">
              <div className="icon-box-icon">
                <svg
                  className="pregnant-woman mt-3 primary-color-500"
                  width="50"
                  height="50"
                >
                  <use xlinkHref="#dental-stetic"></use>
                </svg>
              </div>
              <div className="icon-box-content">
                <h3 className="card-title py-2">Estética dental</h3>
                <p>Transforma tu Sonrisa, transforma tu Vida</p>
                <p>
                  Realza la belleza natural de tu sonrisa con nuestros
                  tratamientos estéticos avanzados. Expertos en blanqueamiento,
                  carillas y más, para darte la confianza que mereces.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 pb-3">
            <div className="icon-box p-4 bg-light border-radius-10 text-center">
              <div className="icon-box-icon">
                <svg
                  className="nutrition mt-3 primary-color-500"
                  width="50"
                  height="50"
                >
                  <use xlinkHref="#implant"></use>
                </svg>
              </div>
              <div className="icon-box-content">
                <h3 className="card-title py-2">Implantología</h3>
                <p>Restaura tu Sonrisa, renueva tu confianza.</p>
                <p>
                  Ofrecemos soluciones de implantes dentales de vanguardia para
                  reemplazar dientes perdidos y restaurar la funcionalidad
                  completa de tu boca con resultados duraderos y naturales.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 pb-3">
            <div className="icon-box p-4 bg-light border-radius-10 text-center">
              <div className="icon-box-icon">
                <svg
                  className="local-pharmacy mt-3 primary-color-500"
                  width="50"
                  height="50"
                >
                  <use xlinkHref="#ortodoncy"></use>
                </svg>
              </div>
              <div className="icon-box-content">
                <h3 className="card-title py-2">Ortodoncia</h3>
                <p>Sonrisas Perfectamente Alineadas para Todas las Edades.</p>
                <p>
                  Corrige tu sonrisa con nuestros tratamientos de ortodoncia
                  personalizados. Utilizamos técnicas modernas para asegurar
                  resultados efectivos y estéticos que mejoran tu apariencia y
                  salud dental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
