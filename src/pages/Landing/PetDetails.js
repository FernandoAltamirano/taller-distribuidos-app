import React from "react";
import Layout from "./Layout";

function PetDetails() {
  return (
    <Layout>
      <main>
        <div class="ficha-todos">
          <img src="/images/ficha.png" alt="adopta, salvalos y dales amor" />
        </div>
        <div id="ficha-return">
          <a href="./galeria.html">
            <img src="/images/atras.png" alt="volver" />
          </a>
          <h2>Volver a la galería</h2>
        </div>
        <div id="ficha-principal">
          <div id="ficha-portada">
            <div class="ficha-foto">
              <img src="/images/perrito2.png" alt="" />
            </div>
            <div class="ficha-descripcion">
              <div>
                <h1>COSMO</h1>
                <p>3 años</p>
              </div>
              <p>
                Es un cachorro alegre y juguetón. Es bastante emocional y te
                recibe siempre saltando y con ánimos para jugar. Es muy sociable
                con todos y se divierte con pelotas. Como todo cachorro,
                necesita paciencia y educación. Sabe dar la patita.
              </p>
              <h4>
                {" "}
                <i>Fecha aprox de nacimiento: Abril 2018</i>{" "}
              </h4>
            </div>
          </div>
          <div id="ficha-caracter">
            <div class="ficha-uno">
              <div>
                <h2>CARACTERÍSTICAS FÍSICAS</h2>
              </div>
              <table class="default">
                <tr>
                  <td>Edad</td>
                  <td>3 años</td>
                </tr>
                <tr>
                  <td>Tamaño</td>
                  <td>Pequeño</td>
                </tr>
                <tr>
                  <td>Sexo</td>
                  <td>Macho</td>
                </tr>
                <tr>
                  <td>Largo de Pelo</td>
                  <td>Corto</td>
                </tr>
              </table>
            </div>
            <div class="ficha-dos">
              <div>
                <h2>SALUD</h2>
              </div>
              <table class="default">
                <tr>
                  <td>Alergia</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Tratamiento</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Enfermedad Crónica</td>
                  <td>No</td>
                </tr>
              </table>
            </div>
            <div class="ficha-tres">
              <div>
                <h2>HISTORIA</h2>
              </div>
              <p>
                Matias fue abandonado cuando era un bebe y rescatado de la
                Panamericana norte, muy desorientado y deshidratado, en enero de
                2019. Desde entonces se recuperó exitosamente dentro del
                albergue y ya está listo para ir a un hogar.
              </p>
            </div>
          </div>
        </div>
        <div class="ficha-obtener">
          <div>
            <h2>¡Lo quiero!</h2>
            <a href="./index.html">
              <img src="/images/patita.png" alt="" />{" "}
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default PetDetails;
