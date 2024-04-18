import { FC } from "react";
import React from "react";
import "./Map.scss";
import {
  AddHome,
  CloudUpload,
  DirectionsBike,
  DirectionsCar,
  DirectionsWalk,
  SaveAlt,
  Share,
  Tune,
  LocalActivity,
  Museum,
  MusicNote,
  AccountBalance,
  NightsStay,
  EmojiNature,
  Church,
  AutoAwesome,
  TagFaces
} from "@mui/icons-material";
import { Checkbox, Grid, IconButton } from "@mui/material";
import { TransportType } from "./Maps.type";
import { Typography } from "antd";
import styled from "styled-components";
import { COLORS, FONT } from "../../UI/Colors";

type MapSidebarProps = {
  hotelMode: boolean;
  toggleHotelMode: React.Dispatch<React.SetStateAction<boolean>>;
  transportMode: TransportType;
  setTransportMode: React.Dispatch<React.SetStateAction<TransportType>>;
  toggleIsTripSaveModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsTripLoadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const interestsIcons: Record<string, React.ReactNode> = {
  Religion: <Church />,
  Event: <LocalActivity />,
  Nature: <EmojiNature />,
  Museum: <Museum />,
  Art: <AutoAwesome />,
  Music: <MusicNote />,
  "Night Life": <NightsStay />,
  "Street Art": <TagFaces />,
  Monument: <AccountBalance />
};

const MapSidebar: FC<MapSidebarProps> = ({
  hotelMode,
  toggleHotelMode,
  transportMode,
  setTransportMode,
  toggleIsTripSaveModalOpen,
  toggleIsTripLoadModalOpen
}) => {
  const [isTransportModeSelectionOpen, toggleIsTransportModeSelectionOpen] =
    React.useState<boolean>(false);
  const [isInterestsModeSelectionOpen, toggleIsInterestsModeSelectionOpen] =
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
        <AddHome sx={{ color: hotelMode ? "blue" : undefined }} />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 0,
          borderBottom: "1px solid lightgray",
          transition: "color 1s ease 0s"
        }}
        type="button"
        onClick={() => toggleIsTripSaveModalOpen((prev) => !prev)}
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
        onClick={() => toggleIsInterestsModeSelectionOpen((prev) => !prev)}
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
        <Share />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 0,
          borderBottom: "1px solid lightgray",
          transition: "color 1s ease 0s"
        }}
        type="button"
        onClick={() => toggleIsTripLoadModalOpen((prev) => !prev)}
      >
        <CloudUpload />
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
      <div
        className={
          "interestsSelection" +
          (isInterestsModeSelectionOpen ? " interestsSelectionOpened" : "")
        }
      >
        <div style={{ display: "flex", width: "fit-content" }}>
          <h3 style={{ flexDirection: "column", padding: "12px" }}>
            Edit your interests here !{" "}
          </h3>
          <SaveInterestsButton>Save them</SaveInterestsButton>
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          {Object.entries(interestsIcons).map(([key, icon]) => (
            <Grid item key={key}>
              <InterestsIcon color="default">
                {icon}
                <Typography>{key}</Typography>
                <Checkbox />
              </InterestsIcon>
            </Grid>
          ))}
        </div>
      </div>
    </nav>
  );
};

const InterestsIcon = styled(IconButton)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  height: 100px;
  padding-top: 15px !important;
  border-radius: 0px !important;
  border-bottom: 1px solid lightgray !important;
  border-top: 1px solid lightgray !important;
  border-right: 1px solid lightgray !important;

  &:hover {
    background-color: lightgray !important;
  }
`;

const SaveInterestsButton = styled.button`
  width: fit-content;
  height: 50px;
  background-color: ${COLORS.blue};
  color: ${COLORS.bg};
  border-radius: 5px;
  margin: 15px;
  padding: 10px 14px;
  font-family: ${FONT};
  font-size: 16px;
  font-weight: bold;
  align-items: flex-end;

  &:hover {
    background-color: ${COLORS.blueGreen};
    transition: all ease-in-out 0.2s;
  }
`;

export default MapSidebar;
