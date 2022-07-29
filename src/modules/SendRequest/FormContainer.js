import { Button, MenuItem, TextField } from "@mui/material";
import isEmpty from "is-empty";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PetsController } from "../../controllers/Pets.controller";
import RequestsController from "../../controllers/Requests.controller";
import { formatDateNumbersNow } from "../../helpers";

export const FormContainer = ({ data, handleClose }) => {
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    address: "",
    phone: "",
    country: "",
    postal: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeRequestData = (ev) => {
    setRequest({
      ...request,
      [ev.target.name]: ev.target.value,
    });
  };

  useEffect(() => {
    if (!isEmpty(errors)) {
      customValidations();
    }
  }, [request]);

  const customValidations = () => {
    let errors = {};
    if (isEmpty(request.name)) {
      errors.name = true;
    }
    setErrors(errors);
    return errors;
  };

  const handleSendRequest = async () => {
    const newRequestData = {
      ...request,
      country: "Perú",
      application_date: formatDateNumbersNow(),
    };

    const response = await RequestsController.sendNewRequest({
      setLoading,
      id: data.id,
      petData: newRequestData,
    });
    if (response) {
      handleClose();
    }
  };

  return (
    <div className="layout-page modal-container send-request-pet-modal">
      <div>
        <h1>Envío de solicitud</h1>
        <div className="form-container grid">
          <div className="grid">
            <TextField value={data?.name} name="name" label="Nombre" disabled />
            <TextField
              InputLabelProps={{ shrink: true }}
              value={data?.date}
              label="Fecha de nacimiento"
              name="date"
              type="date"
              disabled
            />
            <TextField
              value={data?.gender}
              name="gender"
              label="Género"
              disabled
            />
            <TextField value={data?.size} name="size" label="Tamaño" disabled />
          </div>
          <div className="container-grid-image-send-request">
            <img src={data.img} width="90%" alt="" />
          </div>
        </div>
        <br />
        <br />
        <h1>Completa la información</h1>
        <div className="form-container grid">
          <TextField
            value={request?.address}
            name="address"
            label="Dirección"
            onChange={handleChangeRequestData}
          />
          <TextField
            value={request?.phone}
            name="phone"
            label="Teléfono"
            onChange={handleChangeRequestData}
          />
          <TextField
            name="country"
            value="Perú"
            label="País"
            disabled
            onChange={handleChangeRequestData}
          />
          <TextField
            name="postal"
            value={request?.postal}
            label="Código postal"
            onChange={handleChangeRequestData}
          />
        </div>
        <div className="btn-container-pets-page">
          <Button
            onClick={handleSendRequest}
            className="btn-base"
            variant="contained"
            disabled={loading}
          >
            Enviar solicitud
          </Button>
          <Button
            onClick={handleClose}
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
