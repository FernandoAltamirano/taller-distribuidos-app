import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

function Galery() {
  return (
    <Layout>
      <main>
        <div class="galery-portada">
          <figure>
            <img src="/images/galeria.png" alt="" />
          </figure>
        </div>
        <div id="galery-selection">
          <aside>
            <h3>Filtrar por</h3>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              ex, nam temporibus quis pariatur sequi. Ullam, nihil in dolorum
              minus, voluptatibus expedita deleniti iste neque ab nulla
              asperiores, numquam aliquid.
            </p>
          </aside>
          <section id="galery-grid">
            <div class="galery-grid-item">
              <img src="/images/perrito1.jpg" alt="" />
              <div class="galery-choose-item">
                <div class="querer">
                  <h2>
                    <Link to="/portal/galeria/detalles">¡Lo quiero!</Link>
                  </h2>
                  <img src="/images/patita.png" alt="" />
                </div>
              </div>
            </div>
            <div class="galery-grid-item">
              <img src="/images/perrito2.png" alt="" />
              <div class="galery-choose-item">
                <div class="querer">
                  <h2>¡Lo quiero!</h2>
                  <a href="./ficha.html">
                    <img src="/images/patita.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div class="galery-grid-item">
              <img src="/images/perrito3.png" alt="" />
              <div class="galery-choose-item">
                <div class="querer">
                  <h2>¡Lo quiero!</h2>
                  <a href="./ficha.html">
                    <img src="/images/patita.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div class="galery-grid-item">
              <img src="/images/perrito4.png" alt="" />
              <div class="galery-choose-item">
                <div class="querer">
                  <h2>¡Lo quiero!</h2>
                  <img src="/images/patita.png" alt="" />
                </div>
              </div>
            </div>
            <div class="galery-grid-item">
              <img src="/images/perrito5.jpg" alt="" />
              <div class="galery-choose-item">
                <div class="querer">
                  <h2>¡Lo quiero!</h2>
                  <img src="/images/patita.png" alt="" />
                </div>
              </div>
            </div>
            <div class="galery-grid-item">
              <img src="/images/perrito6.jpg" alt="" />
              <div class="galery-choose-item">
                <div class="querer">
                  <h2>¡Lo quiero!</h2>
                  <img src="/images/patita.png" alt="" />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="galery-mas-items">
          <div class="galery-atras">
            <a href="#">
              <img src="/images/atras.png" alt="atras" />
            </a>
            <h2>Anterior</h2>
          </div>
          <div class="galery-adelante">
            <h2>Siguiente</h2>
            <a href="#">
              <img src="/images/adelante.png" alt="adelante" />
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Galery;
