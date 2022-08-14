import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import isEmpty from "is-empty";
import { chargePreviewImage, uploadImage } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { UserController } from "../../controllers/User.controller";
import { setUser } from "../../redux/actions";
export const Settings = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
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
      data: data?.img,
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
    document.getElementById("input-update-image").value = "";
  };

  const executeSendData = async (urlImage) => {
    if (!urlImage) {
      urlImage = userData.img;
    }
    await UserController.updateInstitutionData({
      data: { ...userData, img: urlImage },
      id: userData.id,
      setLoading,
      dispatch,
      setUser,
    });
  };
  const handleUpdateUserData = async () => {
    const errors = customValidations();
    if (!isEmpty(errors)) return;
    setLoading(true);
    if (isEmpty(previewImage.name)) {
      await executeSendData();
    } else {
      await uploadImage({ file, executeSendData, directory: "users" });
    }
  };
  const customValidations = () => {
    let errors = {};
    if (isEmpty(userData.name)) {
      errors.name = true;
    }
    if (isEmpty(userData.email)) {
      errors.email = true;
    }
    if (isEmpty(userData.address)) {
      errors.address = true;
    }

    setErrors(errors);
    return errors;
  };

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
            <input
              id='input-update-image'
              type='file'
              hidden
              onChange={handleUpdateImage}
            />
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
            error={errors.name}
            value={userData?.name}
            name='name'
            onChange={handleUserData}
            label='Nombre'
          />
          <TextField
            error={errors.email}
            value={userData?.email}
            name='email'
            disabled
            label='Correo electrónico'
          />
          <TextField
            error={errors.address}
            value={userData?.address}
            name='address'
            onChange={handleUserData}
            label='Dirección'
          />
          <TextField
            error={errors.phone}
            value={userData?.phone}
            name='phone'
            onChange={handleUserData}
            label='Teléfono'
          />
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
