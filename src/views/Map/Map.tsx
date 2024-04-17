/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import "./Map.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Range } from "react-date-range";
import { useSelector } from "react-redux";
import {
  GeolocateControl,
  Layer,
  Marker,
  Map,
  MapRef,
  NavigationControl,
  ScaleControl,
  Source
} from "react-map-gl";
import { FeatureCollection } from "geojson";
import { Popup, MapLayerMouseEvent } from "mapbox-gl";
import Routes from "./Routes";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { format } from "date-fns";
import { getSearchInput } from "../../reducers/search.reducers";
import {
  BaseMapPropsDefault,
  mapGjsonToSteps,
  weekColors
} from "./Maps.helpers";
import { GeoJsonRes, TransportType } from "./Maps.type";
import styled from "styled-components";
import { Geometry } from "@turf/helpers";
import WithHeader from "../../Layout/WithHeader";
import MapSidebar from "./MapSidebar";
import { DatePicker, Table, Button } from "antd";
import StepMarker from "./StepMarker";
import { useGenerateItinerary } from "../../hooks/useGenerateItinerary";
import dayjs from "dayjs";
import { useSaveTrip } from "../../hooks/useSaveTrip";
import { useGetTrips } from "../../hooks/useGetTrips";
import { Trip, getSavedTrips } from "../../reducers/trips.reducers";
import TripSection from "./TripSection";
import { useSearchParams } from "react-router-dom";
import { useShareTrip } from "../../hooks/useShareTrip";

const BaseMap: FC = () => {
  const mapRef = React.useRef<MapRef>(null);
  const [dropoffs, setDropoffs] = useState<{
    [id: string]: FeatureCollection;
  }>({});
  const [routes, setRoutes] = useState<{
    [id: string]: FeatureCollection;
  }>({});
  const searchState = useSelector(getSearchInput);
  const trips = useSelector(getSavedTrips);
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("id");

  const tripsColumns = [
    {
      title: "City",
      dataIndex: "cityName",
      key: "cityName"
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate"
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "endDate"
    },
    {
      title: "Shared",
      dataIndex: "",
      key: "share",
      render: (record: Trip) => (
        <Button
          onClick={() => {
            shareTrip(record.id);
          }}
          loading={shareTripStatus.loading}
          disabled={shareTripStatus.loading}
        >
          {" "}
          Share{" "}
        </Button>
      )
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      // eslint-disable-next-line
      render: (record: Trip) => (
        <Button
          onClick={() => {
            setIsComputing(true);
            setTripData({
              bbox: null,
              cityName: record.cityName,
              lat: null,
              lon: null
            });
            setRange([
              {
                endDate: new Date(record.endDate),
                startDate: new Date(record.startDate),
                key: "selection"
              }
            ]);
            computeMapData(record.tripData, false);
            toggleIsTripLoadModalOpen(false);
          }}
        >
          Load
        </Button>
      )
    }
  ];

  const [length, setLength] = useState<number>(BaseMapPropsDefault.length);
  const [itineraryDay, setItineraryDay] = useState<number>(0);
  const [tripData, setTripData] = useState<{
    lat: number | null;
    lon: number | null;
    cityName: string | null;
    bbox: number[] | null;
  }>(
    searchState.cityName
      ? (searchState as {
          lat: number;
          lon: number;
          cityName: string;
          bbox: number[];
        })
      : {
          lat: BaseMapPropsDefault.lat,
          lon: BaseMapPropsDefault.lng,
          cityName: null,
          bbox: null
        }
  );
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      key: "selection"
    }
  ]);
  const [markers, setMarkers] = useState<React.ReactElement[]>([]);
  const [hotel, setHotel] = useState<React.ReactElement[]>([]);
  const [cursor, setCursor] = useState<string>("grab");
  const [isHotelSelectionActivated, setIsHotelSelectionActivated] =
    useState<boolean>(false);
  const [isTripSaveModalOpen, toggleIsTripSaveModalOpen] =
    useState<boolean>(false);
  const [isTripLoadModalOpen, toggleIsTripLoadModalOpen] =
    useState<boolean>(false);
  const [isComputing, setIsComputing] = useState<boolean>(false);

  const [transportMode, setTransportMode] = useState<TransportType>(
    TransportType.WALKING
  );
  const [generateItineraryStatus, generateItinerary] = useGenerateItinerary();
  const [saveTripStatus, saveTrip] = useSaveTrip();
  const [getTripsStatus, getTrips] = useGetTrips();
  const [shareTripStatus, shareTrip] = useShareTrip();
  const [currentTrip, setCurrentTrip] = useState<GeoJsonRes | null>(null);
  const [jsonData, setJsonData] = useState<{
    features: {
      geometry: {
        coordinates: number[];
      };
      properties: {
        name: string;
        href: string;
        bbox: number[];
      };
    }[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the JSON file using the relative path
      const response = await fetch("/data.geojson");
      const data = await response.json();

      setJsonData(data);
    };

    fetchData();
    if (tripId) {
      loadTripFromId(tripId);
    }
  }, []);

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    if (!e.features || !e.features[0]) return;
    if (e.features[0].layer.id === "city-layer") {
      setTripData({
        cityName: e.features[0].properties?.name || "",
        lat: (e.features[0].geometry as any).coordinates[1] || 0,
        lon: (e.features[0].geometry as any).coordinates[0] || 0,
        bbox: e.features[0].properties?.bbox || []
      });
      mapRef.current?.flyTo({
        center: [
          (e.features[0].geometry as any).coordinates[0] || 0,
          (e.features[0].geometry as any).coordinates[1] || 0
        ],
        zoom: 10,
        duration: 1000
      });
    } else if (e.features[0].layer.id.includes("routeline-active")) {
      setItineraryDay(
        parseInt(e.features[0].layer.id.replace("routeline-active", ""))
      );
    }
  };

  useEffect(() => {
    if (isTripLoadModalOpen) getTrips();
  }, [isTripLoadModalOpen]);

  const handleMapDblClick = async (e: MapLayerMouseEvent) => {
    if (isHotelSelectionActivated) {
      const newMarker = (
        <Marker
          key={markers.length}
          longitude={e.lngLat.lng}
          latitude={e.lngLat.lat}
        >
          <HotelMarker
            width={36}
            height={36}
            alt={"hotel"}
            src={
              "https://em-content.zobj.net/source/microsoft-teams/337/house_1f3e0.png"
            }
          />
        </Marker>
      );
      setHotel([newMarker]);
      setTripData((prev) => ({
        cityName: prev.cityName,
        lat: e.lngLat.lat,
        lon: e.lngLat.lng,
        bbox: [
          e.lngLat.lng - 0.12,
          e.lngLat.lat - 0.12,
          e.lngLat.lng + 0.12,
          e.lngLat.lat + 0.12
        ]
      }));
      setIsHotelSelectionActivated(false);
    }
  };

  const loadTripFromId = async (id: string) => {
    let localTrips = trips;
    if (!localTrips.length) {
      localTrips = await getTrips();
    }
    const trip = localTrips.find((x) => x.id === id);
    if (!trip) {
      return;
    } else {
      const endDate = new Date(0);
      const startDate = new Date(0);
      endDate.setUTCSeconds(trip.endDate / 1000);
      startDate.setUTCSeconds(trip.startDate / 1000);
      setIsComputing(true);
      setTripData({
        bbox: null,
        cityName: trip.cityName,
        lat: null,
        lon: null
      });
      setRange([
        {
          endDate: new Date(endDate),
          startDate: new Date(startDate),
          key: "selection"
        }
      ]);
      computeMapData(trip.tripData, false);
      setCurrentTrip(trip.tripData);
      setTimeout(() => {
        mapRef.current?.flyTo({
          center: [
            trip.tripData.features[0].features[0].geometry
              .coordinates[0] as unknown as number,
            trip.tripData.features[0].features[0].geometry
              .coordinates[1] as unknown as number
          ],
          zoom: 12
        });
      }, 500);
    }
  };

  useEffect(() => {
    if (range.length === 0 || !range[0].endDate || !range[0].startDate) return;
    const diffTime = Math.abs(
      range[0]?.endDate?.getTime() - range[0]?.startDate?.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setLength(diffDays);
  }, [range]);

  const computeMapData = (resJson: GeoJsonRes, status: boolean) => {
    setMarkers([]);
    setDropoffs({});
    setRoutes({});
    if (status === false) {
      mapRef.current?.flyTo({
        center: [
          resJson.features[0].features[0].geometry
            .coordinates[0] as unknown as number,
          resJson.features[0].features[0].geometry
            .coordinates[1] as unknown as number
        ],
        zoom: 12
      });
    }

    if (resJson.features) {
      for (const features of resJson.features) {
        const i = resJson.features.indexOf(features);
        if (!features) continue;
        setDropoffs((old) => ({
          ...old,
          [i]: features as unknown as FeatureCollection
        }));
      }
    }

    if (resJson.routes) {
      for (const routes1 of resJson.routes) {
        const i = resJson.routes.indexOf(routes1);
        if (!routes1) continue;
        setRoutes((old) => ({
          ...old,
          [i]: routes1.route
        }));
      }
    }

    setIsComputing(false);
  };

  const fetchCoordinates = async (
    lng: number,
    lat: number,
    transportMode: TransportType,
    //eslint-disable-next-line
    bbox: number[]
  ) => {
    if (!lng && !lat) return;
    try {
      const resJsonWithStatus = await generateItinerary({
        lon: lng ?? 0,
        lat: lat ?? 0,
        days: length,
        transportMean: transportMode,
        bbox: [lng - 0.12, lat - 0.12, lng + 0.12, lat + 0.12]
      });

      setIsComputing(true);
      setCurrentTrip(resJsonWithStatus[1]);
      computeMapData(resJsonWithStatus[1], resJsonWithStatus[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setMarkers([]);
    dropoffs[itineraryDay]?.features?.forEach((element, i: number) => {
      const pic = element?.properties?.photos?.length
        ? element?.properties?.photos[0].prefix +
          "original" +
          element?.properties?.photos[0].suffix
        : null;
      setMarkers((old) => [
        ...old,
        <Marker
          key={element?.properties?.name + i}
          latitude={
            (element.geometry as Partial<Geometry> & { coordinates: number[] })
              .coordinates[1]
          }
          longitude={
            (element.geometry as Partial<Geometry> & { coordinates: number[] })
              .coordinates[0]
          }
          popup={new Popup({
            offset: 20,
            className: "markerPopup",
            anchor: "bottom",
            closeOnMove: true,
            closeOnClick: true
          }).setHTML(
            `<h3>${
              element?.properties?.name
            }</h3><img width="200" height="100" src="${`${
              pic ||
              "https://www.freeiconspng.com/thumbs/ghost-icon/ghost-icon-14.png"
            }`}" />`
          )}
        >
          {/* <CustomMarker element={element as Feature} /> */}
          <StepMarker dayIndex={itineraryDay} featureIndex={i} />
        </Marker>
      ]);
    });
  }, [dropoffs, itineraryDay]);

  useEffect(() => {
    if (
      !generateItineraryStatus.loading &&
      !!tripData.cityName &&
      !isComputing
    ) {
      fetchCoordinates(
        tripData.lon as number,
        tripData.lat as number,
        transportMode,
        tripData.bbox || []
      );
    }
    setItineraryDay(0);
  }, [tripData, transportMode]);

  return (
    <WithHeader>
      <>
        <MapSidebar
          hotelMode={isHotelSelectionActivated}
          toggleHotelMode={setIsHotelSelectionActivated}
          setTransportMode={setTransportMode}
          transportMode={transportMode}
          toggleIsTripSaveModalOpen={toggleIsTripSaveModalOpen}
          toggleIsTripLoadModalOpen={toggleIsTripLoadModalOpen}
        />
        <div className="searchBar">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={jsonData?.features ?? []}
            getOptionLabel={(option) => option.properties.name}
            sx={{ width: 300 }}
            isOptionEqualToValue={(option, value) =>
              option.properties.name === value.properties.name
            }
            onChange={(event, newValue) => {
              if (newValue) {
                setTripData({
                  cityName: newValue.properties.name,
                  lat: newValue.geometry.coordinates[1],
                  lon: newValue.geometry.coordinates[0],
                  bbox: newValue.properties.bbox
                });
                mapRef.current?.flyTo({
                  center: [
                    newValue.geometry.coordinates[0],
                    newValue.geometry.coordinates[1]
                  ],
                  zoom: 12
                });
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="City" key={params.id} />
            )}
          />
          <DatePicker.RangePicker
            size={"middle"}
            placement="bottomLeft"
            onChange={(rv) => {
              if (!rv || !rv[0] || !rv[1]) return;
              if (!rv[0]?.isBefore(rv[1]?.add(-7, "day"))) {
                setRange([
                  {
                    startDate: rv[0].toDate(),
                    endDate: rv[1].toDate(),
                    key: "selection"
                  }
                ]);
              }
            }}
            disabledDate={(date) => date.toDate() < new Date()}
            value={[dayjs(range[0].startDate), dayjs(range[0].endDate)]}
          />
        </div>
        <div className="mapWrapper" id="mapWrapper">
          <div
            id="mapContainer"
            className={
              "map" +
              (isHotelSelectionActivated ? " mapContainerHotelSelectionOn" : "")
            }
          >
            {generateItineraryStatus.loading && tripData.cityName ? (
              <div className="itineraryLoading">
                {" "}
                <p>
                  <b>
                    YOUR TRIP TO {tripData.cityName.toUpperCase()} IS BEING
                    GENERATED
                  </b>
                </p>
                <span className="loader"></span>
              </div>
            ) : null}
            <Map
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              initialViewState={{
                latitude: tripData.lat as number,
                longitude: tripData.lon as number,
                zoom: 10
              }}
              ref={mapRef}
              cursor={cursor}
              mapStyle="mapbox://styles/mapbox/streets-v12"
              projection={"globe"}
              interactiveLayerIds={[
                "city-layer",
                ...Object.keys(routes)
                  .map((key) => parseInt(key))
                  .map((key) => `routeline-active${key}`)
              ]}
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={() => setCursor("grab")}
              onClick={handleMapClick}
              onDblClick={handleMapDblClick}
              minZoom={1}
            >
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
              />
              <NavigationControl />
              <ScaleControl maxWidth={100} unit="metric" />

              <Source
                id="cities"
                type="geojson"
                data={`${process.env.REACT_APP_URI}/data.geojson`}
              />
              <Layer
                id="city-layer"
                type="circle"
                source="cities"
                paint={{
                  "circle-radius": 4,
                  "circle-stroke-width": 1,
                  "circle-color": "red",
                  "circle-stroke-color": "white"
                }}
              />

              {markers?.map((marker) => marker)}
              {hotel?.map((marker) => marker)}
              <Routes
                routes={routes}
                colors={weekColors}
                itineraryDay={itineraryDay}
              />
            </Map>
          </div>
          {tripData && range[0].startDate && (
            <TripSection
              loading={generateItineraryStatus.loading}
              tripData={tripData}
              startDate={range[0].startDate}
              steps={mapGjsonToSteps(
                currentTrip,
                !!hotel.length,
                transportMode,
                mapRef,
                setItineraryDay
              )}
            />
          )}
        </div>

        {isTripSaveModalOpen ? (
          <div className="tripSaveModal">
            <div className="tripSaveModalContent">
              <h2>Do you want to save your trip?</h2>
              <p>
                On our free plan you can only save up to 3 trips. If you want to
                save more, you can upgrade to our premium plan.
              </p>
              {saveTripStatus.loading ? <CircularProgress /> : null}
              <div className="tripSaveModalButtons">
                <button
                  type="button"
                  className="tripSaveModalButton"
                  onClick={() => toggleIsTripSaveModalOpen(false)}
                  disabled={saveTripStatus.loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saveTripStatus.loading}
                  className="tripSaveModalButton"
                  onClick={async () => {
                    await saveTrip({
                      startDate: range[0]?.startDate?.getTime() || 0,
                      endDate: range[0]?.endDate?.getTime() || 0,
                      housingCoordinates: [
                        hotel[0]?.props.longitude || 0,
                        hotel[0]?.props.latitude || 0
                      ],
                      cityName: tripData.cityName || "",
                      tripData: currentTrip as GeoJsonRes
                    });
                    toggleIsTripSaveModalOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {isTripLoadModalOpen ? (
          <div className="tripSaveModal">
            <div className="tripSaveModalContent">
              <h2>Load up a saved trip</h2>
              {getTripsStatus.loading ? (
                <CircularProgress />
              ) : (
                <div>
                  <Table
                    size="small"
                    dataSource={trips.map((trip) => {
                      const endDate = new Date(0);
                      const startDate = new Date(0);
                      endDate.setUTCSeconds(trip.endDate / 1000);
                      startDate.setUTCSeconds(trip.startDate / 1000);
                      return {
                        ...trip,
                        endDate: format(endDate, "dd MMM yyyy"),
                        startDate: format(startDate, "dd MMM yyyy")
                      };
                    })}
                    columns={tripsColumns}
                    bordered
                  />
                </div>
              )}
              <div className="tripSaveModalButtons">
                <button
                  type="button"
                  className="tripSaveModalButton"
                  onClick={() => toggleIsTripLoadModalOpen(false)}
                  disabled={saveTripStatus.loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </>
    </WithHeader>
  );
};

const HotelMarker = styled.img`
  z-index: 999;
  position: relative;
`;

export default BaseMap;
