import { Button, MenuItem, TextField } from "@mui/material";
import isEmpty from "is-empty";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PetsController } from "../../controllers/Pets.controller";
import { chargePreviewImage, uploadImage } from "../../helpers";

export const RegisterPet = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [petData, setPetData] = useState({
    code: "",
    name: "",
    date: "",
    size: "",
    activity: "",
    gender: "",
    img: "",
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

  const executeSendData = async (url) => {
    const response = await PetsController.registerNewPet({
      data: { ...petData, img: url },
      setLoading,
    });
    if (response) {
      navigate("/dashboard/mascotas");
    }
  };
  const handleRegisterPet = async () => {
    const errors = customValidations();
    if (!isEmpty(errors)) return;
    setLoading(true);
    await uploadImage({ file, executeSendData, directory: "pets" });
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
    if (isEmpty(file)) {
      errors.img = true;
    }
    if (isEmpty(petData.description)) {
      errors.description = true;
    }
    if (isEmpty(petData.history)) {
      errors.history = true;
    }
    setErrors(errors);
    return errors;
  };
  const activityOptions = [
    {
      value: "Alto",
      label: "Alto",
    },
    {
      value: "Medio",
      label: "Medio",
    },
    {
      value: "Bajo",
      label: "Bajo",
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

  const [previewImage, setPreviewImage] = useState(null);

  const handleChargePreviewImage = (ev) => {
    if (!isEmpty(ev.target.files)) {
      setFile(ev.target.files[0]);
      chargePreviewImage(ev, setPreviewImage);
    }
  };
  const handleDeletePreviewImage = () => {
    setPreviewImage(null);
  };
  return (
    <div className='layout-page register-pet-page'>
      <h1>Mascotas</h1>
      <span>Agrege la información de una nueva mascota </span>
      <h2>Registro</h2>
      <div className='update-user-page-container'>
        {previewImage?.data && (
          <img src={previewImage?.data} alt={previewImage?.name} />
        )}
        <label className='outlined-button' style={{ width: "140px" }}>
          Añadir fotografía
          <input
            hidden
            type='file'
            name=''
            id=''
            onChange={handleChargePreviewImage}
          />
        </label>
        {previewImage && (
          <div>
            <button
              className='delete-image-button'
              onClick={handleDeletePreviewImage}
            >
              delete image
            </button>
          </div>
        )}
      </div>
      <div className='grid'>
        <TextField
          error={errors.code}
          value={petData.code}
          name='code'
          onChange={handleSetPetData}
          label='Código'
        />
        <TextField
          error={errors.name}
          value={petData.name}
          name='name'
          onChange={handleSetPetData}
          label='Nombre'
        />
        <TextField
          error={errors.size}
          value={petData.size}
          select
          name='size'
          label='Tamaño'
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
          label='Fecha de nacimiento'
          name='date'
          type='date'
          onChange={handleSetPetData}
        />
        <TextField
          error={errors.activity}
          value={petData.activity}
          select
          name='activity'
          label='Nivel de actividad'
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
          name='gender'
          select
          label='Género'
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
          name='description'
          label='Descripción'
          onChange={handleSetPetData}
        />
        <TextField
          error={errors.history}
          value={petData.history}
          name='history'
          label='Historia'
          onChange={handleSetPetData}
        />
      </div>
      <div className='btn-container-pets-page'>
        <Button
          onClick={handleRegisterPet}
          className='btn-base'
          variant='contained'
          disabled={loading}
        >
          Registrar
        </Button>
      </div>
    </div>
  );
};
