import React from "react";
import Layout from "../../components/Layouts/Landing";
import { Carousel } from "react-responsive-carousel";
import "./styles.css";
import ReturnUp from "../../components/ReturnUp";
export const Landing = () => {
  return (
    <Layout>
      <main>
        <div id="portada">
          <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            swipeable
            showThumbs={false}
          >
            <div>
              <img src="/images/banner1.png" />
            </div>
            <div>
              <img src="/images/banner5.png" />
            </div>
            <div>
              <img src="/images/banner4.png" />
            </div>
          </Carousel>
        </div>
        <div id="acercade">
          <div className="tresperritos">
            <img
              src="/images/tresperritos.jpg"
              alt="adopta, salvalos y dales amor"
            />
          </div>
          <div className="quienSon" id="quienes-somos">
            <div>
              <h1>¿Quiénes Somos?</h1>
              <br />{" "}
              <p>
                Somos un grupo de estudiantes de la carrera de Ingeniería de
                Sistemas de la Universidad Nacional Mayor de San Marcos, que a
                través de este proyecto buscamos un aumento de adopciones en
                Lima , utilizando herramientas técnologías y todo lo aprendido
                en nuestra carrera. Tu también puede ser parte de este increíble
                proyecto
              </p>
            </div>
            <div className="quienSon-imagen">
              <figure>
                <img src="/images/adoptar1.png" alt="" />
              </figure>
              <figure>
                <img src="/images/adoptar2.png" alt="" />
              </figure>
              <figure>
                <img src="/images/adoptar3.png" alt="" />
              </figure>
            </div>
          </div>
        </div>
        <div id="ofrecemos">
          <h2>¿Qué ofrecemos?</h2>
          <div className="ofrecemos-casillas">
            <div>
              <img src="/images/ofrece1.png" alt="" />
              <h3>RESPETO CON LOS ANIMALES</h3>
              <br />
              <p>
                Nos caracterizamos por el respeto a los animales, de manera
                general, ya que vamos en búsqueda de un hogar de calidad para
                estos animales y a su vez ayudar a la comunidad de albergues de
                nuestra sociedad.
              </p>
            </div>
            <div>
              <img src="/images/ofrece2.png" alt="" />
              <h3>AMOR CON LOS ANIMALES</h3>
              <br />
              <p>
                Este pilar es fundamental para nosotros, ya que este proyecto
                nace con ese amor único a nuestras mascotas, a fin de poder
                retribuirle el cariño que ellos nos dan día a día.
              </p>
            </div>
            <div>
              <img src="/images/ofrece3.png" alt="" />
              <h3>SOLIDARIDAD CON LOS ANIMALES</h3>
              <br />
              <p>
                A fin de retribuir con la sociedad, este proyecto busca darle
                una buena calidad de vida a estos animalitos sin hogar que
                desean tener cariño y amor.
              </p>
            </div>
          </div>
        </div>
      </main>
      <ReturnUp />
    </Layout>
  );
};
