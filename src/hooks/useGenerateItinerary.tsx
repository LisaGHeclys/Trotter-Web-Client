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
      transportMean: string;
      bbox: number[];
    }[]
  ) => Promise<[boolean, GeoJsonRes]>
>;

export const useGenerateItinerary: useGenerateItineraryType = () => {
  const webClient = useWebClient();

  return useTypedAsyncFn<{
    lat: number;
    lon: number;
    days: number;
    transportMean: string;
    bbox: number[];
  }>(async (payload) => {
    try {
      const rep: AxiosResponse<GeoJsonRes> = await webClient.post(
        "/IA",
        payload
      );
      console.log(rep.data);
      return [true, rep.data];
    } catch (error) {
      // eslint-disable-next-line
      if ((error as any).response?.status === 401) {
        return [false, downApi];
      }
      toast.error(
        "Something wrong happened, here is a default itinerary in Berlin"
      );
      return [false, downApi];
    }
  }, []);
};
