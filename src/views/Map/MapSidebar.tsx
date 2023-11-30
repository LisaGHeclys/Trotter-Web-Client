import { FC } from "react";
import React from "react";
import "./Map.scss";
import {
  AddHome,
  DirectionsBike,
  DirectionsCar,
  DirectionsWalk,
  SaveAlt,
  Share,
  Tune
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { TransportType } from "./Maps.type";

type MapSidebarProps = {
  hotelMode: boolean;
  toggleHotelMode: React.Dispatch<React.SetStateAction<boolean>>;
  transportMode: TransportType;
  setTransportMode: React.Dispatch<React.SetStateAction<TransportType>>;
};

const MapSidebar: FC<MapSidebarProps> = ({
  hotelMode,
  toggleHotelMode,
  transportMode,
  setTransportMode
}) => {
  const [isTransportModeSelectionOpen, toggleIsTransportModeSelectionOpen] =
    React.useState<boolean>(false);

  return (
    <nav className="sidebar">
      <IconButton
        sx={{
          borderRadius: 0,
          borderBottom: "1px solid lightgray",
          transition: "color 1s ease 0s"
        }}
        type="button"
        onClick={() => toggleHotelMode((state) => !state)}
      >
        <AddHome sx={{ color: hotelMode ? "blue" : "black" }} />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 0,
          borderBottom: "1px solid lightgray",
          transition: "color 1s ease 0s"
        }}
        type="button"
      >
        <Tune />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 0,
          borderBottom: "1px solid lightgray",
          transition: "color 1s ease 0s"
        }}
        type="button"
        onClick={() => toggleIsTransportModeSelectionOpen((prev) => !prev)}
      >
        {transportMode === TransportType.DRIVING ? <DirectionsCar /> : null}
        {transportMode === TransportType.CYCLING ? <DirectionsBike /> : null}
        {transportMode === TransportType.WALKING ? <DirectionsWalk /> : null}
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 0,
          borderBottom: "1px solid lightgray",
          transition: "color 1s ease 0s"
        }}
        type="button"
      >
        <SaveAlt />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 0,
          borderBottom: "1px solid lightgray",
          transition: "color 1s ease 0s"
        }}
        type="button"
      >
        <Share />
      </IconButton>

      <div
        className={
          "transportSelection" +
          (isTransportModeSelectionOpen ? " transportSelectionOpened" : "")
        }
      >
        {transportMode === TransportType.DRIVING ? null : (
          <IconButton
            sx={{
              borderRadius: 0,
              borderBottom: "1px solid lightgray",
              borderRight: "1px solid lightgray",
              borderTop: "1px solid lightgray",
              transition: "color 1s ease 0s"
            }}
            type="button"
            onClick={() => {
              setTransportMode(TransportType.DRIVING);
              toggleIsTransportModeSelectionOpen(false);
            }}
          >
            <DirectionsCar htmlColor="lightgray" />
          </IconButton>
        )}
        {transportMode === TransportType.CYCLING ? null : (
          <IconButton
            sx={{
              borderRadius: 0,
              borderBottom: "1px solid lightgray",
              borderRight: "1px solid lightgray",
              borderTop: "1px solid lightgray",
              transition: "color 1s ease 0s"
            }}
            type="button"
            onClick={() => {
              setTransportMode(TransportType.CYCLING);
              toggleIsTransportModeSelectionOpen(false);
            }}
          >
            <DirectionsBike htmlColor="lightgray" />
          </IconButton>
        )}
        {transportMode === TransportType.WALKING ? null : (
          <IconButton
            sx={{
              borderRadius: 0,
              borderBottom: "1px solid lightgray",
              borderRight: "1px solid lightgray",
              borderTop: "1px solid lightgray",
              transition: "color 1s ease 0s"
            }}
            type="button"
            onClick={() => {
              setTransportMode(TransportType.WALKING);
              toggleIsTransportModeSelectionOpen(false);
            }}
          >
            <DirectionsWalk htmlColor="lightgray" />
          </IconButton>
        )}
      </div>
    </nav>
  );
};

export default MapSidebar;
