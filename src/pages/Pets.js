import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Table } from "../components";
import { TextField, Button } from "@mui/material";
import { PetsController } from "../controllers/Pets.controller";
export const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const filterRef = useRef("");
  const getAllPets = () => {
    PetsController.getAllPets({ setLoading, setPets });
  };

  const handleSearchByFilter = () => {
    const filterValue = filterRef.current.value;
    if (filterValue !== "") {
      const filteredPets = pets.filter((pet) => pet.name === filterValue);
      setPets(filteredPets);
    }
  };

  const handleResetFilter = () => {
    filterRef.current.value = "";
    getAllPets();
  };
  useEffect(() => {
    getAllPets();
  }, []);

  return (
    <div className="layout-page">
      <h1>Mascotas</h1>
      <div>
        <span>margorie margarita alonso varillas </span>
        <Link to="/register">Registrar nuevo {">"}</Link>

        <div className="pets-table-container">
          <div className="flex filters-container">
            <TextField inputRef={filterRef} label="Buscar" variant="outlined" />
            <Button
              onClick={handleSearchByFilter}
              className="btn-base"
              variant="contained"
            >
              Filtrar
            </Button>
            <Button
              onClick={handleResetFilter}
              className="btn-base-outlined"
              variant="outlined"
            >
              Resetear
            </Button>
          </div>
          {!loading ? <Table rows={pets} /> : <Loader />}
        </div>
      </div>
    </div>
  );
};
