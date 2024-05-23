import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

register();

const Testimonial = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      
    });

    swiperElRef.current.addEventListener("swiperslidechange", (e) => {
      
    });
  }, []);

  return (
    <section
      id="testimonial"
      style={{
        backgroundImage: "url(images/review-bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        height: "595px",
      }}
    > 
      <div className="container">
        <div className="row align-items-center padding-medium">
          <div className="col-lg-5 col-md-4">
            <div className="image-holder">
              <img
                src="images/review-image.png"
                alt="review"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-lg-7 col-md-8">
            <div className="review-content">
              <swiper-container
                ref={swiperElRef}
                slides-per-view="1"
                navigation="true"
                pagination="true"
                loop="true"
              >
                <swiper-slide>
                  <div className="review-item">
                    <svg
                      className="quote quote-up primary-color-500 position-absolute"
                      width="80"
                      height="70"
                    >
                      <use xlinkHref="#quote-up" />
                    </svg>
                    <blockquote className="fs-4">
                      <p>
                        Mi experiencia en Dental Luxe ha sido sobresaliente. El
                        personal es increíblemente cuidadoso y el ambiente es
                        muy confortable. Tras recibir varios tratamientos de
                        implantología, estoy impresionado con los resultados.
                        Altamente recomendado por su profesionalismo y calidad.
                      </p>
                      <div className="author-detail">
                        <div className="name fs-3 fw-bold text-dark">
                          Carlos Ruiz
                        </div>
                        <span className="text-cadet-blue text-uppercase">
                          Paciente
                        </span>
                      </div>
                    </blockquote>
                    <svg
                      className="quote quote-down primary-color-500 position-absolute"
                      width="80"
                      height="70"
                    >
                      <use xlinkHref="#quote-down" />
                    </svg>
                  </div>
                </swiper-slide>

                <swiper-slide>
                  <div className="review-item">
                    <svg
                      className="quote quote-up primary-color-500 position-absolute"
                      width="80"
                      height="70"
                    >
                      <use xlinkHref="#quote-up" />
                    </svg>
                    <blockquote className="fs-4">
                      <p>
                        El equipo es muy profesional y amable, y me explicaron
                        cada paso del tratamiento con detalle. Me sometí a un
                        procedimiento de estética dental, y los resultados
                        superaron todas mis expectativas. Mi sonrisa nunca había
                        lucido tan bien, y el proceso fue totalmente indoloro!
                        Sin duda recomiendo Dental Luxe a cualquiera que busque
                        mejorar su sonrisa en un ambiente de confianza y
                        profesionalismo. ¡Gracias por devolverme la confianza en
                        mi sonrisa!
                      </p>
                      <div className="author-detail">
                        <div className="name fs-3 fw-bold text-dark">
                          Marta Gómez
                        </div>
                        <span className="text-cadet-blue text-uppercase">
                          Paciente
                        </span>
                      </div>
                    </blockquote>
                    <svg
                      className="quote quote-down primary-color-500 position-absolute"
                      width="80"
                      height="70"
                    >
                      <use xlinkHref="#quote-down" />
                    </svg>
                  </div>
                </swiper-slide>

                <swiper-slide>
                  <div className="review-item">
                    <svg
                      className="quote quote-up primary-color-500 position-absolute"
                      width="80"
                      height="70"
                    >
                      <use xlinkHref="#quote-up" />
                    </svg>
                    <blockquote className="fs-4">
                      <p>
                        Visitar Dental Luxe fue la mejor decisión para mi
                        tratamiento de ortodoncia. El proceso fue claro y el
                        trato, excepcional. Los resultados han sido fantásticos
                        y el cuidado post-tratamiento, impecable. Realmente se
                        nota la calidad y atención al detalle.
                      </p>
                      <div className="author-detail">
                        <div className="name fs-3 fw-bold text-dark">
                          Laura Jiménez
                        </div>
                        <span className="text-cadet-blue text-uppercase">
                          Paciente
                        </span>
                      </div>
                    </blockquote>
                    <svg
                      className="quote quote-down primary-color-500 position-absolute"
                      width="80"
                      height="70"
                    >
                      <use xlinkHref="#quote-down" />
                    </svg>
                  </div>
                </swiper-slide>
              </swiper-container>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
