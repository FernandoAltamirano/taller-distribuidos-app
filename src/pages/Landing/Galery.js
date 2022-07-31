import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layouts/Landing";
import { PetsController } from "../../controllers/Pets.controller";
import { Loader } from "../../components";
import "./styles.css";
import { useSelector } from "react-redux";
import isEmpty from "is-empty";
export const Galery = () => {
  const state = useSelector((state) => state.User);
  const [availablePets, setAvailablePets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    PetsController.getAllPets({ setLoading, setPets: setAvailablePets });
  }, []);

  return (
    <Layout>
      <main>
        <div className="galery-portada">
          <figure>
            <img src="/images/galeria.png" alt="" />
          </figure>
        </div>
        <div>
          <h1 style={{ marginTop: "1rem" }}>Mascotas disponibles</h1>
        </div>
        {loading ? (
          <div style={{ minHeight: "500px" }}>
            <Loader message="Cargando mascotas disponibles" />
          </div>
        ) : (
          <section id="galery-container">
            {availablePets.map((pet) => {
              return (
                <div className="galery-container-item">
                  <img src={pet.img} alt="" />
                  {isEmpty(state?.user?.name) && (
                    <div className="galery-choose-item">
                      <Link to={`/galeria/detalles/${pet.id}`}>
                        <h2>¡Lo quiero!</h2>
                        <img src="/images/patita.png" alt="" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}
      </main>
    </Layout>
  );
};
