import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../pages/Landing/styles.css";
function Layout({ children }) {
  const state = useSelector((state) => state.User);
  return (
    <React.Fragment>
      <header className="cabecera">
        <div>
          <div className="heade">
            <div className="title">
              <h2>
                <Link to="/portal"> TITULO</Link>
              </h2>
            </div>
            <div className="enlaces">
              <div className="galeri">
                <Link to="/portal/galeria">Galería</Link>
              </div>
              {!state?.user && (
                <div className="sesion">
                  <Link to="/inicia-sesion">Iniciar Sesión</Link>
                </div>
              )}
              <div>
                <img
                  className="iuno"
                  src="/images/usuario.png"
                  alt="imagen_del_usuario"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer>
        <div>
          <h2>SÍGUENOS EN NUESTRAS REDES SOCIALES</h2>
        </div>
        <div className="footer-enlaces">
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
        <p style={{ paddingBottom: "1rem" }}>
          © 2022 - Todos los derechos reservados.
        </p>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
