import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, MenuItem, TextField } from "@mui/material";
import isEmpty from "is-empty";
import { chargePreviewImage, uploadImage } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { UserController } from "../../controllers/User.controller";
import { setUser } from "../../redux/actions";

export const UserDetails = () => {
  const state = useSelector((state) => state.User);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    sex: "",
    phone: "",
    createdAt: "",
    updatedAt: "",
    img: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleUserData = (ev) => {
    setUserData({
      ...userData,
      [ev.target.name]: ev.target.value,
    });
  };

  useEffect(() => {
    if (!isEmpty(errors)) {
      customValidations();
    }
  }, [userData]);

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const data = await UserController.getUserDataByToken({
      token,
      setUser,
      dispatch,
    });
    setUserData(data);
    setPreviewImage({
      name: "",
      data: data.img,
    });
  };
  useEffect(() => {
    getUserInfo();
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
      data: userData?.img,
    });
  };

  const executeSendData = async (urlImage) => {
    if (!urlImage) {
      urlImage = userData.img;
    }
    await UserController.updateUserData({
      data: { ...userData, img: urlImage },
      id: userData.id,
      setLoading,
      dispatch,
      setUser,
    });
    getUserInfo();
  };
  const handleUpdateUserData = async () => {
    const errors = customValidations();
    if (!isEmpty(errors)) return;
    setLoading(true);
    if (isEmpty(previewImage.name)) {
      await executeSendData();
      setLoading(false);
    } else {
      await uploadImage({ file, executeSendData, directory: "users" });
    }
  };
  const customValidations = () => {
    let errors = {};
    if (isEmpty(userData.firstname)) {
      errors.firstname = true;
    }
    setErrors(errors);
    return errors;
  };
  const sexOptions = [
    {
      value: true,
      label: "Masculino",
    },
    {
      value: false,
      label: "Femenino",
    },
  ];

  if (state?.user?.name) return <Navigate to='/' replace />;

  return (
    <div className='layout-page update-user-page'>
      <div>
        <h1>Editar información</h1>
        <div className='update-user-page-container'>
          <img
            src={previewImage?.data || "/default-profile.png"}
            alt='profile user'
            width={200}
          />
          <label className='outlined-button'>
            Cambiar imagen{" "}
            <input type='file' hidden onChange={handleUpdateImage} />
          </label>
          {userData?.img !== previewImage?.data && (
            <button
              className='delete-image-button'
              onClick={handleDeletePreviewImage}
            >
              Borrar imagen
            </button>
          )}
        </div>
        <div className='form-container grid'>
          <TextField
            error={errors.firstname}
            value={userData?.firstname}
            name='firstname'
            onChange={handleUserData}
            label='Primer nombre'
          />
          <TextField
            error={errors.lastname}
            value={userData?.lastname}
            name='lastname'
            onChange={handleUserData}
            label='Primer apellido'
          />
          <TextField
            error={errors.email}
            value={userData?.email}
            name='email'
            disabled
            label='Correo electrónico'
          />
          <TextField
            error={errors.phone}
            value={userData?.phone}
            name='phone'
            onChange={handleUserData}
            label='Teléfono'
          />
          <TextField
            error={errors.sex}
            value={userData?.sex}
            name='sex'
            onChange={handleUserData}
            select
            label='Sexo'
          >
            {sexOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={userData?.createdAt}
            label='Fecha de creación'
            name='createdAt'
            disabled
            type='text'
          />
          <TextField
            value={userData?.updatedAt}
            label='Fecha de actualización'
            name='updatedAt'
            disabled
            type='text'
          />
        </div>
        <div className='btn-container-pets-page'>
          <Button
            onClick={handleUpdateUserData}
            className='btn-base'
            variant='contained'
            disabled={loading}
          >
            Actualizar
          </Button>
        </div>
      </div>
    </div>
  );
};
