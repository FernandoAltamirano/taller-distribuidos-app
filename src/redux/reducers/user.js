import { userActionTypes } from "../constants";
const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case userActionTypes.DELETE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
