import { AnyAction } from "redux";
import { RootState } from "../store";

export interface SearchState {
  place: {
    lat?: number;
    lon?: number;
    cityName?: string;
  };
}

const initialState: SearchState = {
  place: {}
};

export default function searchReducers(
  state: SearchState = initialState,
  action: AnyAction
): SearchState {
  switch (action.type) {
    case "SEARCH":
      if (
        typeof action.payload.place === "object" &&
        action.payload.place !== null
      )
        return {
          ...state,
          place: action.payload.place
        };
      break;
    case "CLEAR_SEARCH":
      return {
        place: {}
      };
    default:
      return state;
  }
  return state;
}

export const getSearchInput = (store: RootState) => store.search.place;
