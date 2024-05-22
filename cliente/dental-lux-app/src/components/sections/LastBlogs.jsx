
const LastBlogs = () => {
  return (
    <section id="latest-blog" className="padding-large mt-5">
      <div className="container">
        <div className="row">
          <div className="display-header">
            <h2 className="display-5 fw-bold text-dark">Nuestras últimas publicaciones</h2>
          </div>
          <div className="post-grid d-flex flex-wrap mt-4">
            <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
              <div className="card-item pe-3">
                <div className="card border-0 bg-transparent">
                  <div className="card-image position-relative">
                    <img
                      src="images/post-item1.jpg"
                      alt=""
                      className="post-image img-fluid border-radius-top-10"
                    />
                    <span
                      className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize"
                      >Alimentación</span
                    >
                  </div>
                </div>
                <div className="card-body p-3 mt-2">
                  <div className="meta-date">14 Diciembre, 2023</div>
                  <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                    <a href="blog-single.html"
                      >10 alimentos que te ayudan a cuidar tu boca</a
                    >
                  </h3>
                  <p>
                    Mantener una boca saludable va más allá de un buen cepillado y uso regular de hilo dental; lo que comes también juega un papel crucial. En nuestro último artículo del blog, exploramos 10 alimentos que son verdaderos aliados para la salud bucal. Desde crujientes manzanas ...
                    <a href="blog-single.html" className="text-decoration-underline"
                      ><em>Leer más</em></a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
              <div className="card-item pe-3">
                <div className="card border-0 bg-transparent">
                  <div className="card-image position-relative">
                    <img
                      src="images/post-item2.jpg"
                      alt=""
                      className="post-image img-fluid border-radius-top-10"
                    />
                    <span
                      className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize"
                      >Salud mental</span
                    >
                  </div>
                </div>
                <div className="card-body p-3 mt-2">
                  <div className="meta-date">02 Febrero, 2024</div>
                  <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                    <a href="blog-single.html"
                      >Cómo relajarse en visita al dentista</a
                    >
                  </h3>
                  <p>
                    Visitar al dentista puede ser una fuente de ansiedad para muchos, pero hay estrategias efectivas para mantener la calma y hacer de la experiencia algo positivo. En nuestro nuevo artículo del blog, compartimos consejos prácticos sobre cómo relajarte antes y durante tus citas dentales. Desde técnicas de respiración profunda...
                    <a href="blog-single.html" className="text-decoration-underline"
                      ><em>Leer más</em></a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
              <div className="card-item pe-2">
                <div className="card border-0 bg-transparent">
                  <div className="card-image position-relative">
                    <img
                      src="images/post-item3.jpg"
                      alt=""
                      className="post-image img-fluid border-radius-top-10"
                    />
                    <span
                      className="bg-primary-dim text-light position-absolute text-uppercase text-capitalize"
                      >Familia</span
                    >
                  </div>
                </div>
                <div className="card-body p-3 mt-2">
                  <div className="meta-date">05 Marzo, 2024</div>
                  <h3 className="card-title fs-3 text-capitalize fw-semibold mt-3">
                    <a href="blog-single.html"
                      >La higiene dental de los más pequeños</a
                    >
                  </h3>
                  <p>
                    Inculcar buenos hábitos de higiene dental en los más pequeños es fundamental para su salud a largo plazo. En nuestro último artículo del blog, ofrecemos consejos y técnicas para ayudar a los niños a cuidar sus dientes de manera efectiva y divertida. Desde elegir cepillos de dientes apropiados para su edad hasta juegos...
                    <a href="blog-single.html" className="text-decoration-underline"
                      ><em>Leer más</em></a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          href="blog.html"
          className="btn btn-medium btn-primary btn-pill text-uppercase text-center mx-auto"
          >Leer más publicaciones</a
        >
      </div>
    </section>
  )
}

export default LastBlogs