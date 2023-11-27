import { FC } from "react";
import React from "react";
import "./Map.scss";
import { weekColors } from "./Maps.utils";

type StepMarkerProps = {
  dayIndex: number;
  featureIndex: number;
  onClick?: () => void;
};

const StepMarker: FC<StepMarkerProps> = ({
  dayIndex,
  featureIndex,
  onClick
}) => {
  return (
    <div
      className="stepMarker"
      style={{ backgroundColor: weekColors[dayIndex].primary }}
      onClick={onClick}
    >
      <p className="stepMarkerNumber">{featureIndex + 1}</p>
    </div>
  );
};

export default StepMarker;
