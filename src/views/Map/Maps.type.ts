import { Position } from "@turf/helpers";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

export type BaseMapProps = {
  length: number;
  price: number;
  lng: number;
  lat: number;
  cityName: string;
};

export type FeatureDTO = {
  properties: {
    name: string;
    images: string[];
  } | null;
};

export type GeoJsonRes = {
  features: {
    features: {
      geometry: {
        coordinates: Position[];
      };
      properties: {
        name: string;
      };
      images: string[];
    }[];
  }[];
  routes: {
    features: {
      geometry: {
        coordinates: Position[];
      };
      properties: {
        name: string;
      };
    }[];
  }[];
};

export interface UnderLineProps {
  itineraryDay: number;
}

export type RoutesProps = {
  routes: { [id: string]: FeatureCollection<Geometry, GeoJsonProperties> };
  colors: { primary: string; secondary: string }[];
  itineraryDay: number;
};
