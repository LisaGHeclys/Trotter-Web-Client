import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useGetTrips = () => {
  const webClient = useWebClient();
  const dispatch = useDispatch();

  return useTypedAsyncFn(async () => {
    try {
      const res = await webClient.get(`/trips`);
      dispatch({ type: "UPDATE_TRIPS", payload: res.data });
    } catch (error) {
      toast.error("Couldn't fetch your trips. Please try again later.");
    }
  }, []);
};
