import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { FC, Fragment } from "react";
import { Layer, Source } from "react-map-gl";

type DropoffsProps = {
  dropoffs: { [id: string]: FeatureCollection<Geometry, GeoJsonProperties> };
  colors: { primary: string; secondary: string }[];
  itineraryDay: number;
};

const Dropoffs: FC<DropoffsProps> = ({ dropoffs, colors, itineraryDay }) => {
  return (
    <Fragment key={itineraryDay}>
      <Source
        id={`dropoffs${itineraryDay}`}
        type="geojson"
        data={dropoffs[itineraryDay]}
      />
      <Layer
        id={`dropoff${itineraryDay}`}
        type="circle"
        source={`dropoffs${itineraryDay}`}
        paint={{
          "circle-radius": 6,
          "circle-color": colors[itineraryDay].primary,
          "circle-stroke-color": colors[itineraryDay].secondary,
          "circle-stroke-width": 1
        }}
      />
    </Fragment>
  );
};

export default Dropoffs;
