import { userActionTypes } from "../constants";

export const setUser = (user) => {
  return { type: userActionTypes.SET_USER, payload: user };
};

export const deleteUser = () => {
  return { type: userActionTypes.DELETE_USER, payload: null };
};
