import { AnyAction } from "redux";

interface searchState {
  place: string;
}

const initialState: searchState = {
  place: "Paris"
};

export default function searchReducers(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        place: action.payload.place
      };
    case "CLEAR_SEARCH":
      return {
        place: ""
      };
    default:
      return state;
  }
}
