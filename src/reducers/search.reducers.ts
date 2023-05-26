import { AnyAction } from "redux";

export interface SearchState {
  place: string;
}

const initialState: SearchState = {
  place: "Paris"
};

export default function searchReducers(
  state: SearchState = initialState,
  action: AnyAction
): SearchState {
  switch (action.type) {
    case "SEARCH":
      if (typeof action.payload.place === "string")
        return {
          ...state,
          place: action.payload.place
        };
      break;
    case "CLEAR_SEARCH":
      return {
        place: ""
      };
    default:
      return state;
  }
  return state;
}
