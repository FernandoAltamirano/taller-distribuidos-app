import { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthController } from "../../controllers/Auth.controller";
import isEmpty from "is-empty";
import { EMAIL_PATTERN } from "../../constants";

export const Register = () => {
  const [registerData, setRegisterData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const confirmPasswordRef = useRef(null);
  const [isInstitution, setIsInstitution] = useState(false);
  const navigate = useNavigate();

  const customValidations = () => {
    let errors = {};
    if (isEmpty(registerData.first)) {
      errors.first = true;
    }
    if (isEmpty(registerData.second)) {
      errors.second = true;
    }
    if (
      isEmpty(registerData.email) ||
      !EMAIL_PATTERN.test(registerData.email)
    ) {
      errors.email = true;
    }
    if (
      isEmpty(registerData.password) ||
      registerData.password.length < 8 ||
      registerData.password.length > 20
    ) {
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
    delete errors[ev.target.name];
  };

  const handleRegisterData = async () => {
    const errors = customValidations();
    if (!isEmpty(errors)) return;
    let data = { ...registerData };
    if (isInstitution) {
      data = {
        ...data,
        name: registerData.first,
        address: registerData.second,
        userType: "INSTITUTION",
      };
    } else {
      data = {
        ...data,
        firstname: registerData.first,
        lastname: registerData.second,
      };
    }
    delete data["first"];
    delete data["second"];
    const response = await AuthController.register({
      data,
      setLoading,
    });
    if (response) {
      navigate("/inicia-sesion");
    }
  };

  const handleChangeisInstitution = (ev) => {
    if (ev.target.checked) {
      setIsInstitution(true);
    } else {
      setIsInstitution(false);
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
      <div
        className="flex"
        style={{ justifyContent: "flex-end", gap: "1rem", margin: "1rem 0" }}
      >
        <p>Registrar como institución</p>
        <input type="checkbox" onChange={handleChangeisInstitution} id="" />
      </div>
      <div className="flex-column form-container">
        <TextField
          error={errors.first}
          value={registerData.first}
          required
          name="first"
          label={isInstitution ? "Nombres" : "Primer nombre"}
          variant="outlined"
          onChange={handleChangeRegisterData}
        />
        <TextField
          error={errors.second}
          value={registerData.second}
          required
          name="second"
          label={isInstitution ? "Dirección" : "Apellidos"}
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
