import { Link } from "react-router-dom";
import { Table } from "../components";
import { TextField, Button } from "@mui/material";
export const Pets = () => {
  return (
    <div className="pets-page">
      <h1>Mascotas</h1>
      <div>
        <span>margorie margarita alonso varillas </span>
        <Link to="/register">Registrar nuevo {">"}</Link>

        <div className="pets-table-container">
          <div className="flex filters-container">
            <TextField id="outlined-basic" label="Buscar" variant="outlined" />
            <Button variant="contained">Filtrar</Button>
            <Button variant="outlined">Resetear</Button>
          </div>
          <Table />
        </div>
      </div>
    </div>
  );
};
