import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTripFromId } from "../../hooks/useGetTripFromId";
import { FeatureCollection, Geometry } from "@turf/helpers";
import {
  Layer,
  Map,
  MapRef,
  Marker,
  NavigationControl,
  ScaleControl
} from "react-map-gl";
import { GeoJsonRes, TransportType } from "../Map/Maps.type";
import { Range } from "react-date-range";
import WithHeader from "../../Layout/WithHeader";
import Routes from "../Map/Routes";
import { mapGjsonToSteps, weekColors } from "../Map/Maps.helpers";
import "./index.scss";
import TripSection from "../Map/TripSection";
import StepMarker from "../Map/StepMarker";

const SharedTripPage = () => {
  const [, fetchTrip] = useGetTripFromId();
  const { tripId } = useParams();

  const mapRef = React.useRef<MapRef>(null);
  const [dropoffs, setDropoffs] = useState<{
    [id: string]: FeatureCollection;
  }>({});
  const [routes, setRoutes] = useState<{
    [id: string]: FeatureCollection;
  }>({});
  const [tripData, setTripData] = useState<{
    cityName: string;
    title: string;
  }>();
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      key: "selection"
    }
  ]);
  const [markers, setMarkers] = useState<React.ReactElement[]>([]);
  const [hotel] = useState<React.ReactElement[]>([]);
  const [, setIsComputing] = useState<boolean>(false);
  const [currTrip, setCurrTrip] = useState<GeoJsonRes | null>(null);
  //   const dummyTrip : Trip = {
  //     cityName: "",
  //     endDate: 0,
  //     housingCoordinates: [],
  //     id: "",
  //     startDate: 0,
  //     tripData: {features: [], routes: []}
  //   }

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

  useEffect(() => {
    Object.keys(dropoffs).forEach((itineraryDay) => {
      dropoffs[itineraryDay]?.features?.forEach((element, i: number) => {
        setMarkers((old) => [
          ...old,
          <Marker
            key={element?.properties?.name + i}
            latitude={
              (
                element.geometry as Partial<Geometry> & {
                  coordinates: number[];
                }
              ).coordinates[1]
            }
            longitude={
              (
                element.geometry as Partial<Geometry> & {
                  coordinates: number[];
                }
              ).coordinates[0]
            }
          >
            {/* <CustomMarker element={element as Feature} /> */}
            <StepMarker dayIndex={parseInt(itineraryDay)} featureIndex={i} />
          </Marker>
        ]);
      });
    });
  }, [dropoffs]);

  useEffect(() => {
    if (!tripId) return;
    const shareTripEngine = async () => {
      const trip = await fetchTrip(tripId);
      if (!trip) return;
      setCurrTrip(trip.tripData);
      const endDate = new Date(0);
      const startDate = new Date(0);
      endDate.setUTCSeconds(trip.endDate / 1000);
      startDate.setUTCSeconds(trip.startDate / 1000);
      setIsComputing(true);
      setTripData({
        cityName: trip.cityName,
        title: ""
      });
      setRange([
        {
          endDate: new Date(endDate),
          startDate: new Date(startDate),
          key: "selection"
        }
      ]);
      computeMapData(trip.tripData, false);
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
    };

    shareTripEngine();
    mapRef.current?.resize();
  }, []);

  return (
    <WithHeader>
      <div className="sharePageLayout">
        <div className="infos">
          <TripSection
            isShared
            loading={false}
            tripData={{
              bbox: [],
              lat: null,
              lon: null,
              cityName: tripData?.cityName ?? ""
            }}
            startDate={range[0].startDate ?? new Date()}
            steps={mapGjsonToSteps(
              currTrip,
              !!hotel.length,
              TransportType.WALKING,
              mapRef,
              () => {
                return;
              }
            )}
          />
        </div>
        <div className="mapContainer">
          <Map
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            initialViewState={{
              zoom: 10
            }}
            ref={mapRef}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            projection={"globe"}
            interactiveLayerIds={[
              "city-layer",
              ...Object.keys(routes)
                .map((key) => parseInt(key))
                .map((key) => `routeline-active${key}`)
            ]}
            //   onClick={handleMapClick}
            minZoom={1}
          >
            <NavigationControl />
            <ScaleControl maxWidth={100} unit="metric" />

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
              //eslint-disable-next-line
              routes={routes as any}
              colors={weekColors}
              itineraryDay={-1}
            />
          </Map>
        </div>
      </div>
    </WithHeader>
  );
};

export default SharedTripPage;
