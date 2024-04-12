import { AnyAction } from "redux";
import { RootState } from "../store";

export type User = {
  username: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  id: string;
};

export interface AuthState {
  isLoggedIn: boolean;
  token?: string;
  user?: User;
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
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
  return state;
}

export const getUserToken = (store: RootState) => store.auth.token;
export const getUser = (store: RootState): User => store.auth.user;
