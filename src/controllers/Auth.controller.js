import isEmpty from "is-empty";
import { BASE_URL } from "../constants/baseUrl";
import { toast } from "../helpers";
export class AuthController {
  static register = async ({ data, setLoading }) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      if (!isEmpty(jsonResponse.id)) {
        toast("success", "Registro exitoso.");
        return jsonResponse;
      } else {
        toast("warn", jsonResponse.error);
      }
    } catch (err) {
      toast("warn", "Ocurrió un problema al intentar registrar sus datos.");
      return false;
    } finally {
      setLoading(false);
    }
  };
  static login = async ({ data, setLoading }) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.token) {
        toast("success", "Inicio de sesión exitoso.");
        return jsonResponse;
      } else {
        toast("warn", "Credenciales incorrectas.");
      }
      return false;
    } catch (err) {
      toast("warn", "Ocurrió un problema al intentar iniciar sesión.");
      return false;
    } finally {
      setLoading(false);
    }
  };
}
