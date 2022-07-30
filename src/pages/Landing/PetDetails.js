import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Layouts/Landing";
import { PetsController } from "../../controllers/Pets.controller";
import { SendRequestModal } from "../../modules/SendRequest";

export const PetDetails = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [pet, setPet] = useState(null);
  useEffect(() => {
    const id = location.pathname.split("/").reverse()[0];
    PetsController.getPetById({ setLoading, setPet, id });
  }, []);

  const handleSendRequest = () => {
    setShowModal(true);
  };
  return (
    <>
      <Layout>
        <main>
          <div className="ficha-todos">
            <img src="/images/ficha.png" alt="adopta, salvalos y dales amor" />
          </div>
          <Link to="/portal/galeria">
            <div id="ficha-return">
              <span>
                <img src="/images/atras.png" alt="volver" />
              </span>
              <h2>Volver a la galería</h2>
            </div>
          </Link>
          <div id="ficha-principal">
            <div id="ficha-portada">
              <div className="ficha-foto">
                <img src={pet?.img} alt="" />
              </div>
              <div className="ficha-descripcion">
                <div>
                  <h1>{pet?.name}</h1>
                  <p>3 años</p>
                </div>
                <p>{pet?.description}</p>
                <h4>
                  {" "}
                  <i>
                    Fecha aproximada de nacimiento:{" "}
                    {pet?.date.split("-").reverse().join("-")}
                  </i>{" "}
                </h4>
              </div>
            </div>
            <div id="ficha-caracter">
              <div className="ficha-uno">
                <div className="title-ficha">
                  <h2>CARACTERÍSTICAS</h2>
                </div>
                <div className="ficha-contenido">
                  <div>
                    <strong>Nivel de actividad: </strong>
                    <span>{pet?.activity}</span>
                  </div>
                  <div>
                    <strong>Fecha de nacimiento: </strong>
                    <span>{pet?.date.split("-").reverse().join("-")}</span>
                  </div>
                  <div>
                    <strong>Sexo: </strong>
                    <span>{pet?.gender}</span>
                  </div>
                  <div>
                    <strong>Pelaje: </strong>
                    <span>Corto</span>
                  </div>
                </div>
              </div>
              <div className="ficha-dos">
                <div className="title-ficha">
                  <h2>SALUD</h2>
                </div>
                <table className="default">
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
              <div className="ficha-tres">
                <div className="title-ficha">
                  <h2>HISTORIA</h2>
                </div>
                <p>{pet?.history}</p>
              </div>
            </div>
          </div>
          <div className="ficha-obtener">
            <div onClick={handleSendRequest}>
              <h2>¡Lo quiero!</h2>
              <span>
                <img src="/images/patita.png" alt="" />{" "}
              </span>
            </div>
          </div>
        </main>
      </Layout>
      {showModal && (
        <SendRequestModal
          open={showModal}
          setShowModal={setShowModal}
          data={pet}
        />
      )}
    </>
  );
};
