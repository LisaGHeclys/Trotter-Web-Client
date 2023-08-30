import { AnyAction } from "redux";
import { RootState } from "../store";

export interface AuthState {
  isLoggedIn: boolean;
  token?: string;
}

const initialState: AuthState = {
  isLoggedIn: false
};

export default function authReducers(
  state: AuthState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case "LOGIN":
      if (typeof action.payload === "string")
        return {
          ...state,
          isLoggedIn: true,
          token: action.payload
        };
      break;
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
  return state;
}

export const getUserToken = (store: RootState) => store.auth.token;
