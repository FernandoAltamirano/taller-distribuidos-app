import { Button, MenuItem, TextField } from "@mui/material";
import isEmpty from "is-empty";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PetsController } from "../../controllers/Pets.controller";

const URL =
  "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg";
export const FormContainer = ({ data, deleteData, id, getAllPets }) => {
  const navigate = useNavigate();
  const [petData, setPetData] = useState({
    code: "",
    name: "",
    date: "",
    size: "",
    activity: "",
    gender: "",
    img: URL,
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangePetData = (ev) => {
    setPetData({
      ...petData,
      [ev.target.name]: ev.target.value,
    });
  };

  useEffect(() => {
    if (!isEmpty(errors)) {
      customValidations();
    }
  }, [petData]);

  useEffect(() => {
    setPetData(data);
  }, []);

  const handleUpdatePet = async () => {
    const errors = customValidations();
    if (!isEmpty(errors)) return;
    await PetsController.updatePet({
      data: petData,
      setLoading,
      id,
    });
    deleteData();
    getAllPets();
  };
  const customValidations = () => {
    let errors = {};
    if (isEmpty(petData.name)) {
      errors.name = true;
    }
    if (isEmpty(petData.code)) {
      errors.code = true;
    }
    if (isEmpty(petData.date)) {
      errors.date = true;
    }
    if (isEmpty(petData.size)) {
      errors.size = true;
    }
    if (isEmpty(petData.activity)) {
      errors.activity = true;
    }
    if (isEmpty(petData.gender)) {
      errors.gender = true;
    }
    if (isEmpty(petData.img)) {
      errors.img = true;
    }
    if (isEmpty(petData.description)) {
      errors.description = true;
    }
    setErrors(errors);
    return errors;
  };
  const activityOptions = [
    {
      value: "Alto",
      label: "Alto",
    },
  ];
  const sizeOptions = [
    {
      value: "Pequeño",
      label: "Pequeño",
    },
    {
      value: "Mediano",
      label: "Mediano",
    },
    {
      value: "Grande",
      label: "Grande",
    },
  ];
  const genderOptions = [
    {
      value: "Macho",
      label: "Macho",
    },
    {
      value: "Hembra",
      label: "Hembra",
    },
  ];
  return (
    <div className="layout-page modal-container update-pet-modal">
      <div
        style={{
          width: "70%",
          backgroundColor: "white",
          margin: "0 auto",
          borderRadius: "3rem",
          padding: "3rem",
        }}
      >
        <h1>Editar información</h1>
        <div className="form-container">
          <TextField
            error={errors.code}
            value={petData?.code}
            name="code"
            onChange={handleChangePetData}
            label="Código"
          />
          <TextField
            error={errors.name}
            value={petData?.name}
            name="name"
            onChange={handleChangePetData}
            label="Nombre"
          />
          <TextField
            error={errors.size}
            value={petData?.size}
            select
            name="size"
            label="Tamaño"
            onChange={handleChangePetData}
          >
            {sizeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            InputLabelProps={{ shrink: true }}
            error={errors.date}
            value={petData?.date}
            label="Fecha de nacimiento"
            name="date"
            type="date"
            onChange={handleChangePetData}
          />
          <TextField
            error={errors.activity}
            value={petData?.activity}
            select
            name="activity"
            label="Nivel de actividad"
            onChange={handleChangePetData}
          >
            {activityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={errors.gender}
            value={petData?.gender}
            name="gender"
            select
            label="Género"
            onChange={handleChangePetData}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={errors.description}
            value={petData?.description}
            name="description"
            label="Descripción"
            onChange={handleChangePetData}
          />
        </div>
        <div className="btn-container-pets-page">
          <Button
            onClick={handleUpdatePet}
            className="btn-base"
            variant="contained"
            disabled={loading}
          >
            Actualizar
          </Button>
          <Button
            onClick={() => deleteData()}
            className="btn-base-outlined"
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};
