import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import isEmpty from "is-empty";
import { AuthController } from "../controllers/Auth.controller";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/actions";

export const Login = () => {
  const dp = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const customValidations = () => {
    let errors = {};
    if (isEmpty(loginData.email)) {
      errors.email = true;
    }
    if (isEmpty(loginData.password)) {
      errors.password = true;
    }
    setErrors(errors);
    return errors;
  };

  const handleLogin = async () => {
    const errors = customValidations();
    if (!isEmpty(errors)) return;
    const response = await AuthController.loginInstitution({
      data: loginData,
      setLoading,
    });
    if (!isEmpty(response?.token)) {
      const { token, ...restValues } = response;
      dp(setUser(restValues));
      localStorage.setItem("token", token);
      navigate("/inicio");
    }
  };

  const handleChangeLoginData = (ev) => {
    setLoginData({
      ...loginData,
      [ev.target.name]: ev.target.value,
    });
  };

  useEffect(() => {
    if (!isEmpty(errors)) {
      customValidations();
    }
  }, [loginData]);

  return (
    <>
      <h1>Inicia sesión</h1>
      <div className="flex form-container">
        <TextField
          error={errors.email}
          value={loginData.email}
          name="email"
          label="Correo"
          variant="outlined"
          onChange={handleChangeLoginData}
        />
        <TextField
          error={errors.password}
          value={loginData.password}
          name="password"
          label="Contraseña"
          variant="outlined"
          onChange={handleChangeLoginData}
        />
      </div>
      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={loading}
        className="btn-base"
      >
        Inicia sesión
      </Button>
      <span>¿No tienes una cuenta? </span>
      <Link to="/registrate">Registrate</Link>
    </>
  );
};
