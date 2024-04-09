import { Alert, QRCode, StepProps, Tag } from "antd";
import { BaseMapProps, GeoJsonRes, TransportType } from "./Maps.type";
import {
  DirectionsBike,
  DirectionsCar,
  DirectionsWalk,
  Grade
} from "@mui/icons-material";
import { Card } from "@mui/material";
import StepMarker from "./StepMarker";
import React from "react";
import { MapRef } from "react-map-gl";

export const BaseMapPropsDefault: BaseMapProps = {
  length: 3,
  price: 0,
  lng: 2.333333,
  lat: 48.866667,
  cityName: "Paris"
};

export const weekColors: { primary: string; secondary: string }[] = [
  { primary: "red", secondary: "lightcoral" },
  { primary: "blue", secondary: "lightblue" },
  { primary: "green", secondary: "lightgreen" },
  { primary: "yellow", secondary: "lightyellow" },
  { primary: "orange", secondary: "orange" },
  { primary: "purple", secondary: "purple" },
  { primary: "brown", secondary: "lightbrown" }
];

export const mapGjsonToSteps = (
  gson: GeoJsonRes | null,
  hotel: boolean,
  transportMode: TransportType,
  mapRef: React.RefObject<MapRef>,
  setItineraryDay: React.Dispatch<React.SetStateAction<number>>
): StepProps[][] => {
  if (!gson) return [];
  const steps: StepProps[][] = [];
  gson.features.forEach(() => steps.push([]));
  gson.features.forEach((feature, index) => {
    const tripLegData = gson.routes[index].tripLegData;
    feature.features.forEach((subFeature, subIndex) => {
      steps[index].push({
        title: <b>{subFeature.properties.name}</b>,
        description: (
          <>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 600,
                padding: "12px",
                alignItems: "end",
                justifyContent: "center",
                backgroundColor: "gr",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 14px 0px",
                margin: "12px 12px 12px 24px",
                width: "100%"
              }}
            >
              {subIndex !== 0 || hotel ? (
                <div className="transportInfo">
                  {transportMode === TransportType.DRIVING ? (
                    <DirectionsCar sx={{ height: 16, width: 16 }} />
                  ) : null}
                  {transportMode === TransportType.CYCLING ? (
                    <DirectionsBike sx={{ height: 16, width: 16 }} />
                  ) : null}
                  {transportMode === TransportType.WALKING ? (
                    <DirectionsWalk sx={{ height: 16, width: 16 }} />
                  ) : null}
                  <b>
                    {tripLegData[subIndex].distances}m |{" "}
                    {tripLegData[subIndex].durations} min
                  </b>
                </div>
              ) : null}
              <div
                className="flexRow"
                style={{ justifyContent: "space-between" }}
              >
                <div style={{ maxWidth: 200 }}>
                  <img
                    src={
                      subFeature.properties.photos.length
                        ? subFeature.properties.photos[0].prefix +
                          "original" +
                          subFeature.properties.photos[0].suffix
                        : "https://www.freeiconspng.com/thumbs/ghost-icon/ghost-icon-14.png"
                    }
                    height={132}
                    width={200}
                  />
                  <b>
                    <i>{subFeature.properties.location.formatted_address}</i>
                  </b>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    gap: 12
                  }}
                >
                  {subFeature.properties.description &&
                  subFeature.properties.description !== "NA" ? (
                    <>{subFeature.properties.description}</>
                  ) : null}
                  <div
                    className="flexRow"
                    style={{
                      justifyContent: "flex-start",
                      maxWidth: 250,
                      overflowX: "scroll",
                      gap: 4
                    }}
                  >
                    {subFeature.properties.categories.length ? (
                      <Tag
                        key={`${subIndex}-tag-${subFeature.properties.categories[0].name}`}
                        color="blue"
                        style={{ margin: 0 }}
                      >
                        {subFeature.properties.categories[0].name}
                      </Tag>
                    ) : null}
                  </div>
                </div>

                <div className="flexColumn">
                  {subFeature.properties.website &&
                  subFeature.properties.website !== "NA" ? (
                    <a href={subFeature.properties.website}>
                      <QRCode
                        errorLevel="H"
                        value={subFeature.properties.website}
                        icon="TrotterLogo.png"
                        size={100}
                        iconSize={20}
                      />
                    </a>
                  ) : null}
                  <Alert
                    message={
                      <div className="flexRow" style={{ gap: 2, padding: 0 }}>
                        <Grade />
                        <b>{subFeature.properties.rating.toFixed(1)}</b>
                      </div>
                    }
                    type={
                      subFeature.properties.rating > 8 ? "success" : "warning"
                    }
                  />
                </div>
              </div>
            </Card>
          </>
        ),
        status: "finish",
        icon: (
          <StepMarker
            dayIndex={index}
            featureIndex={subIndex}
            onClick={() => {
              mapRef.current?.flyTo({
                center: [
                  subFeature.geometry.coordinates[0] as unknown as number,
                  subFeature.geometry.coordinates[1] as unknown as number
                ],
                zoom: 16,
                duration: 1000
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
              setItineraryDay(index);
            }}
          />
        )
      });
    });
  });
  return steps;
};
