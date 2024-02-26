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
        photos: {
          prefix: string;
          suffix: string;
        }[];
        description: string;
        website: string;
        rating: number;
        location: {
          formatted_address: string;
        };
        categories: {
          name: string;
        }[];
      };
    }[];
  }[];
  routes: {
    route: {
      features: {
        geometry: {
          coordinates: Position[];
        };
        properties: {
          name: string;
        };
      }[];
    };

    tripLegData: {
      durations: number;
      distances: number;
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

export enum TransportType {
  WALKING = "walking",
  DRIVING = "driving",
  CYCLING = "cycling"
}
