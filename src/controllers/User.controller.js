import isEmpty from "is-empty";
import { BASE_URL } from "../constants";

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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
}
