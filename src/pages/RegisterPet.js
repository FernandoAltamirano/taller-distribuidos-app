import { Button, MenuItem, TextField } from "@mui/material";
import isEmpty from "is-empty";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PetsController } from "../controllers/Pets.controller";

const URL =
  "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg";
export const RegisterPet = () => {
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

  const handleSetPetData = (ev) => {
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

  const handleRegisterPet = async () => {
    const errors = customValidations();
    if (!isEmpty(errors)) return;
    const response = await PetsController.registerNewPet({
      data: petData,
      setLoading,
    });
    if (response) {
      navigate("/mascotas");
    }
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
    <div className="layout-page register-pet-page">
      <h1>Mascotas</h1>
      <span>Agrege la información de una nueva mascota </span>
      <h2>Registro</h2>
      <div className="form-container">
        <TextField
          error={errors.code}
          value={petData.code}
          name="code"
          onChange={handleSetPetData}
          label="Código"
        />
        <TextField
          error={errors.name}
          value={petData.name}
          name="name"
          onChange={handleSetPetData}
          label="Nombre"
        />
        <TextField
          error={errors.size}
          value={petData.size}
          select
          name="size"
          label="Tamaño"
          onChange={handleSetPetData}
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
          value={petData.date}
          label="Fecha de nacimiento"
          name="date"
          type="date"
          onChange={handleSetPetData}
        />
        <TextField
          error={errors.activity}
          value={petData.activity}
          select
          name="activity"
          label="Nivel de actividad"
          onChange={handleSetPetData}
        >
          {activityOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          error={errors.gender}
          value={petData.gender}
          name="gender"
          select
          label="Género"
          onChange={handleSetPetData}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          error={errors.description}
          value={petData.description}
          name="description"
          label="Descripción"
          onChange={handleSetPetData}
        />
      </div>
      <div className="btn-container-pets-page">
        <Button
          onClick={handleRegisterPet}
          className="btn-base"
          variant="contained"
          disabled={loading}
        >
          Registrar
        </Button>
      </div>
      <img className="floating-dog" width="300px" src="/dog.png" alt="" />
    </div>
  );
};
