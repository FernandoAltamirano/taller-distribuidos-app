import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export const LoginForm = ({
  errors,
  loginData,
  handleChangeLoginData,
  loading,
  handleLogin,
  isModal,
  handleClose,
}) => {
  return (
    <div className="auth-form-container">
      {isModal && (
        <div style={{ textAlign: "right" }}>
          <strong style={{ cursor: "pointer" }} onClick={handleClose}>
            X
          </strong>
        </div>
      )}
      <h1>Inicia sesión</h1>
      <div className="flex-column form-container">
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
      <div className="auth-form-container-link">
        <span>¿No tienes una cuenta? </span>
        <Link to="/registrate">Registrate</Link>
      </div>
    </div>
  );
};
