import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "..";
import "../../pages/Landing/styles.css";
function Layout({ children }) {
  const location = useLocation();
  const state = useSelector((state) => state.User);
  return (
    <React.Fragment>
      <header className="cabecera" id="header">
        <div>
          <div className="heade">
            <div className="title">
              <h2>
                <Link to="/"> TITULO</Link>
              </h2>
            </div>
            <div className="enlaces">
              <div className="galeri">
                <Link to="/">Inicio</Link>
              </div>
              <div className="galeri">
                <Link to="/galeria">Galeria</Link>
              </div>
              {!location.pathname.includes("galeria") && (
                <>
                  <div className="galeri">
                    <a href="#quienes-somos">¿Quienes somos?</a>
                  </div>
                  <div className="galeri">
                    <a href="#ofrecemos">¿Que ofrecemos?</a>
                  </div>
                </>
              )}
              <div className="galeri">
                <a href="#contacto">Contacto</a>
              </div>
              {!state?.user ? (
                <div className="sesion">
                  <Link to="/inicia-sesion">Iniciar Sesión</Link>
                </div>
              ) : (
                <div>
                  <Menu />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer id="contacto">
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
