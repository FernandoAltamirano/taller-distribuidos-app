import isEmpty from "is-empty";
import { BASE_URL } from "../constants";
import { toast } from "../helpers";

export class UserController {
  static getUserDataByToken = async ({ token, setUser, dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (isEmpty(data.error)) {
        dispatch(setUser(data));
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  static updateInstitutionData = async ({
    setUser,
    id,
    dispatch,
    data: userData,
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/institution/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (isEmpty(data.error)) {
        toast("success", "Actualización exitosa.");
        dispatch(setUser(data));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  static updateUserData = async ({ setUser, id, dispatch, data: userData }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (isEmpty(data.error)) {
        toast("success", "Actualización exitosa.");
        dispatch(setUser(data));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
}
