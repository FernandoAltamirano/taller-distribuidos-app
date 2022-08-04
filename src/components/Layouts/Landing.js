import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Menu, Logo } from "..";
import MenuIcon from "@mui/icons-material/Menu";
import "../../pages/Landing/styles.css";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

function Layout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const state = useSelector((state) => state.User);

  const handleToggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const detectResize = () => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 985) {
        setShowModal(false);
      }
    });
  };
  useEffect(() => {
    detectResize();
    return () => detectResize();
  });

  return (
    <>
      <header className="cabecera" id="header">
        <div>
          <div className="heade">
            <div className="title">
              <Logo />
            </div>
            <div className="right-section-header">
              <div className="enlaces">
                {!location.pathname.includes("galeria") ? (
                  <>
                    <div className="galeri">
                      <Link to="/galeria">Galería</Link>
                    </div>
                    <div className="galeri">
                      <a href="#quienes-somos">¿Quienes somos?</a>
                    </div>
                    <div className="galeri">
                      <a href="#ofrecemos">¿Que ofrecemos?</a>
                    </div>
                  </>
                ) : (
                  <div className="galeri">
                    <Link to="/">Inicio</Link>
                  </div>
                )}
                <div className="galeri">
                  <a href="#contacto">Contacto</a>
                </div>
              </div>
              <div className="header-right-section">
                {!state?.user ? (
                  <div className="sesion">
                    <Link to="/inicia-sesion">Iniciar Sesión</Link>
                  </div>
                ) : (
                  <div>
                    <Menu />
                  </div>
                )}
                <div className="menu-icon-landing" onClick={handleToggleModal}>
                  <MenuIcon width={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer id="contacto">
        <div>
          <h2>Síguenos en nuestras redes sociales</h2>
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
      <div className={`modal-menu ${showModal ? "show-modal" : ""}`}>
        <div>
          <CloseIcon
            width={30}
            style={{ color: "var(--white-color)" }}
            onClick={handleToggleModal}
          />
        </div>

        {!location.pathname.includes("galeria") ? (
          <>
            <Link to="/galeria" onClick={handleToggleModal}>
              Galería
            </Link>
            <a href="#quienes-somos" onClick={handleToggleModal}>
              ¿Quienes somos?
            </a>
            <a href="#ofrecemos" onClick={handleToggleModal}>
              ¿Qué ofrecemos?
            </a>
          </>
        ) : (
          <Link to="/" onClick={handleToggleModal}>
            Inicio
          </Link>
        )}
        <a href="#contacto" onClick={handleToggleModal}>
          Contacto
        </a>
      </div>
    </>
  );
}

export default Layout;
