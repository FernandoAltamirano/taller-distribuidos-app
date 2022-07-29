import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layouts/Landing";
import { PetsController } from "../../controllers/Pets.controller";
import { Loader } from "../../components";
import "./styles.css";
function Galery() {
  const [availablePets, setAvailablePets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    PetsController.getAllPets({ setLoading, setPets: setAvailablePets });
  }, []);

  return (
    <Layout>
      <main>
        <div class="galery-portada">
          <figure>
            <img src="/images/galeria.png" alt="" />
          </figure>
        </div>
        {loading ? (
          <div style={{ minHeight: "500px" }}>
            <Loader message="Cargando mascotas disponibles" />
          </div>
        ) : (
          <section id="galery-grid">
            {availablePets.map((pet) => {
              return (
                <div class="galery-grid-item">
                  <img src={pet.img} alt="" />
                  <div class="galery-choose-item">
                    <Link to={`/portal/galeria/detalles/${pet.id}`}>
                      <h2>¡Lo quiero!</h2>
                      <img src="/images/patita.png" alt="" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Galery;
