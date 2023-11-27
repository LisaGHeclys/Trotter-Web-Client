import { FC } from "react";
import React from "react";
import "./Map.scss";
import { AddHome, LocalTaxi, SaveAlt, Share, Tune } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type MapSidebarProps = {
  hotelMode: boolean;
  toggleHotelMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const MapSidebar: FC<MapSidebarProps> = ({ hotelMode, toggleHotelMode }) => {
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
      >
        <LocalTaxi />
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
    </nav>
  );
};

export default MapSidebar;
