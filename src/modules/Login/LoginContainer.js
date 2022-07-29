import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmpty from "is-empty";
import { AuthController } from "../../controllers/Auth.controller";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import { LoginForm } from "../../modules/Login/LoginForm";

export const LoginContainer = ({ isModal, handleClose }) => {
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
    const response = await AuthController.login({
      data: loginData,
      setLoading,
    });
    if (!isEmpty(response?.token)) {
      const { token, ...restValues } = response;
      dp(setUser(restValues));
      localStorage.setItem("token", token);
      navigate("/mascotas");
    }
  };

  const handleChangeLoginData = (ev) => {
    setLoginData({
      ...loginData,
      [ev.target.name]: ev.target.value,
    });
    delete errors[ev.target.name];
  };

  useEffect(() => {
    if (!isEmpty(errors)) {
      customValidations();
    }
  }, [loginData]);

  return (
    <LoginForm
      isModal={isModal}
      handleClose={handleClose}
      errors={errors}
      handleChangeLoginData={handleChangeLoginData}
      loading={loading}
      loginData={loginData}
      handleLogin={handleLogin}
    />
  );
};
