import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
function Layout({ children }) {
  return (
    <React.Fragment>
      <header class="cabecera">
        <div class="heade">
          <div class="title">
            <h2>
              <Link to="/portal"> TITULO</Link>
            </h2>
          </div>
          <div class="enlaces">
            <div class="galeri">
              <Link to="/portal/galeria">Galería</Link>
            </div>
            <div class="sesion">
              <Link to="/inicia-sesion">Iniciar Sesión</Link>
            </div>
          </div>
        </div>
        <div class="usuario">
          <a href="">
            <img
              class="iuno"
              src="/images/usuario.png"
              alt="imagen_del_usuario"
            />
          </a>
          <a href="">
            <img
              class="idos"
              src="/images/desplegar.png"
              alt="despliegue_de_opciones"
            />
          </a>
        </div>
      </header>
      <div class="end">
        <div class="barra">
          <li class=" cuenta">
            <a href="./cuenta.html">Mi cuenta</a>
          </li>
          <hr />
          <li class="inciar">
            <a href="./cuenta.html">Cerrar Sesión</a>
          </li>
        </div>
      </div>
      {children}

      <footer>
        <div>
          <h2>SÍGUENOS EN NUESTRAS REDES SOCIALES</h2>
        </div>
        <div class="footer-enlaces">
          <a href="">
            <img src="/images/twitter.png" alt="twitter" />
          </a>
          <a href="">
            <img src="/images/facebook.png" alt="facebook" />
          </a>
          <a href="">
            <img src="/images/instagram.png" alt="instagram" />
          </a>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
