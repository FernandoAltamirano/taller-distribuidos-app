import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Table } from "../components";
import { TextField, Button } from "@mui/material";
import { PetsController } from "../controllers/Pets.controller";
export const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPets = () => {
    PetsController.getAllPets({ setLoading, setPets });
  };

  useEffect(() => {
    getAllPets();
  }, []);

  return (
    <div className="pets-page">
      <h1>Mascotas</h1>
      <div>
        <span>margorie margarita alonso varillas </span>
        <Link to="/register">Registrar nuevo {">"}</Link>

        <div className="pets-table-container">
          <div className="flex filters-container">
            <TextField id="outlined-basic" label="Buscar" variant="outlined" />
            <Button className="btn-base" variant="contained">
              Filtrar
            </Button>
            <Button className="btn-base-outlined" variant="outlined">
              Resetear
            </Button>
          </div>
          {!loading ? <Table rows={pets} /> : <Loader />}
        </div>
      </div>
    </div>
  );
};
