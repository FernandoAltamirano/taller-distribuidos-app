import { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthController } from "../controllers/Auth.controller";
import isEmpty from "is-empty";
import { EMAIL_PATTERN } from '../constants'

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

  const customValidations = () => {
    let errors = {};
    if (isEmpty(registerData.name)) {
      errors.name = true;
    }
    if (isEmpty(registerData.address)) {
      errors.address = true;
    }
    if (isEmpty(registerData.email) || !EMAIL_PATTERN.test(registerData.email)) {
      errors.email = true;
    }
    if (isEmpty(registerData.password) || registerData.password.length < 8 || registerData.password.length > 20) {
      errors.password = true;
    }
    if (
      isEmpty(confirmPasswordRef.current.value) ||
      (!isEmpty(registerData.password) &&
        registerData.password !== confirmPasswordRef.current.value)
    ) {
      errors.confirmPassword = true;
    }
    setErrors(errors);
    return errors;
  };

  const handleChangeRegisterData = (ev) => {
    setRegisterData({
      ...registerData,
      [ev.target.name]: ev.target.value,
    });
    delete errors[ev.target.name]
  };

  const handleRegisterData = async () => {
    const errors = customValidations();
    if (!isEmpty(errors)) return;
    const response = await AuthController.registerInstitution({
      data: registerData,
      setLoading,
    });
    if (response) {
      navigate("/inicia-sesion");
    }
  };

  useEffect(() => {
    if (!isEmpty(errors)) {
      customValidations();
    }
  }, [registerData]);
  return (
    <div className="auth-form-container">
      <h1>Regístrate</h1>
      <div className="flex-column form-container">
        <TextField
          error={errors.name}
          value={registerData.name}
          required
          name="name"
          label="Nombres"
          variant="outlined"
          onChange={handleChangeRegisterData}
        />
        <TextField
          error={errors.email}
          value={registerData.email}
          required
          name="email"
          type="email"
          label="Correo"
          variant="outlined"
          onChange={handleChangeRegisterData}
        />
        <TextField
          error={errors.address}
          value={registerData.address}
          required
          name="address"
          label="Dirección"
          variant="outlined"
          onChange={handleChangeRegisterData}
        />
        <TextField
          error={errors.password}
          value={registerData.password}
          required
          name="password"
          label="Contraseña"
          variant="outlined"
          onChange={handleChangeRegisterData}
        />
        <TextField
          error={errors.confirmPassword}
          inputRef={confirmPasswordRef}
          required
          name="confirmPassword"
          label="Confirmación de contraseña"
          variant="outlined"
        />
      </div>
      <Button
        variant="contained"
        className="btn-base"
        onClick={handleRegisterData}
        disabled={loading}
      >
        Registrarse
      </Button>
      <div className="auth-form-container-link">
        <span>¿Ya tienes una cuenta? </span>
        <Link to="/inicia-sesion">Inicia sesión</Link>
      </div>
    </div>
  );
};
