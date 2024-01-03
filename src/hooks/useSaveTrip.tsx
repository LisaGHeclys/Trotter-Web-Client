import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import toast from "react-hot-toast";

export const useSaveTrip = () => {
  const webClient = useWebClient();

  return useTypedAsyncFn<{
    startDate: number;
    endDate: number;
    housingCoordinates: number[];
    cityName: string;
    tripData: object;
  }>(async (payload) => {
    try {
      await webClient.post(`/trips`, payload);
      toast.success("Your trip has successfully been saved!");
    } catch (error) {
      toast.error("Couldn't save your trip. Try again later.");
    }
  }, []);
};
