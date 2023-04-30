import { AnyAction } from "redux";

interface authState {
  isLoggedIn: boolean;
  token?: string;
}

const initialState: authState = {
  isLoggedIn: false
};

export default function authReducers(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
}
