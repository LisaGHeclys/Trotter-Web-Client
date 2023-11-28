import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import { AxiosResponse } from "axios";
import { GeoJsonRes } from "../views/Map/Maps.type";
import toast from "react-hot-toast";
import { AsyncFnReturn } from "react-use/lib/useAsyncFn";
import downApi from "../views/Map/downApi.json";

type useGenerateItineraryType = () => AsyncFnReturn<
  (
    ...args: {
      lat: number;
      lon: number;
      days: number;
    }[]
  ) => Promise<[boolean, GeoJsonRes]>
>;

export const useGenerateItinerary: useGenerateItineraryType = () => {
  const webClient = useWebClient();

  return useTypedAsyncFn<{ lat: number; lon: number; days: number }>(
    async (payload) => {
      try {
        const rep: AxiosResponse<GeoJsonRes> = await webClient.post(
          "/IA",
          payload
        );
        console.log(rep.data);
        return [true, rep.data];
      } catch (error) {
        toast.error(
          "Something wrong happened, here is a default itinerary in Berlin"
        );
        return [false, downApi];
      }
    },
    []
  );
};
