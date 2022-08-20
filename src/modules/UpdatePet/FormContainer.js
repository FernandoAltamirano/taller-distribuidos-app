import { Button, MenuItem, TextField } from "@mui/material";
import isEmpty from "is-empty";
import { useEffect, useState } from "react";
import { PetsController } from "../../controllers/Pets.controller";
import { chargePreviewImage, uploadImage } from "../../helpers";

export const FormContainer = ({ data, deleteData, id, getAllPets }) => {
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
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState({
    name: "",
    data: data.img,
  });
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

  const handleUpdateImage = (ev) => {
    if (!isEmpty(ev.target.files)) {
      setFile(ev.target.files[0]);
      chargePreviewImage(ev, setPreviewImage);
    }
  };
  const handleDeletePreviewImage = () => {
    setPreviewImage({
      name: "",
      data: data.img,
    });
  };

  const executeSendData = async (urlImage) => {
    if (!urlImage) {
      urlImage = petData.img;
    }
    await PetsController.updatePet({
      data: { ...petData, img: urlImage },
      setLoading,
      id,
    });
    deleteData();
    getAllPets();
  };
  const handleUpdatePet = async () => {
    const errors = customValidations();
    if (!isEmpty(errors)) return;
    if (!isEmpty(previewImage.name)) {
      setLoading(true);
      await uploadImage({ file, executeSendData, directory: "pets" });
      return;
    }
    executeSendData();
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
    <div className='layout-page modal-container update-pet-modal'>
      <div>
        <h1>Editar información</h1>
        <div className='container-outlined-button'>
          <img src={previewImage.data} alt='profile pet' />
          <label className='outlined-button'>
            Cambiar imagen{" "}
            <input type='file' hidden onChange={handleUpdateImage} />
          </label>
          <button className="delete-image-button" onClick={handleDeletePreviewImage}>Borrar imagen</button>
        </div>
        <div className='form-container grid'>
          <TextField
            error={errors.code}
            value={petData?.code}
            name='code'
            onChange={handleChangePetData}
            label='Código'
          />
          <TextField
            error={errors.name}
            value={petData?.name}
            name='name'
            onChange={handleChangePetData}
            label='Nombre'
          />
          <TextField
            error={errors.size}
            value={petData?.size}
            select
            name='size'
            label='Tamaño'
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
            label='Fecha de nacimiento'
            name='date'
            type='date'
            onChange={handleChangePetData}
          />
          <TextField
            error={errors.activity}
            value={petData?.activity}
            select
            name='activity'
            label='Nivel de actividad'
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
            name='gender'
            select
            label='Género'
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
            name='description'
            label='Descripción'
            onChange={handleChangePetData}
          />
          <TextField
            error={errors.history}
            value={petData?.history}
            name='history'
            label='Historia'
            onChange={handleChangePetData}
          />
          <TextField
            error={errors.otherDetails}
            value={petData?.otherDetails}
            name='otherDetails'
            label='Otros detalles'
            onChange={handleChangePetData}
          />
        </div>
        <div className='btn-container-pets-page'>
          <Button
            onClick={handleUpdatePet}
            className='btn-base'
            variant='contained'
            disabled={loading}
          >
            Actualizar
          </Button>
          <Button
            onClick={() => deleteData()}
            className='btn-base-outlined'
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};
