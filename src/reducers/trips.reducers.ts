import { AnyAction } from "redux";
import { RootState } from "../store";
import { GeoJsonRes } from "../views/Map/Maps.type";

export type Trip = {
  cityName: string;
  startDate: number;
  endDate: number;
  housingCoordinates: number[] | null;
  tripData: GeoJsonRes;
};

export interface TripsState {
  trips: Trip[];
}

const initialState: TripsState = {
  trips: []
};

export default function tripsReducers(
  state: TripsState = initialState,
  action: AnyAction
): TripsState {
  switch (action.type) {
    case "UPDATE_TRIPS":
      return {
        trips: action.payload
      };
    default:
      return state;
  }
  return state;
}

export const getSavedTrips = (store: RootState): Trip[] => store.trips.trips;
