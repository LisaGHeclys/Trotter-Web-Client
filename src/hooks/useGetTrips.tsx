import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Trip } from "../reducers/trips.reducers";

export const useGetTrips = () => {
  const webClient = useWebClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return useTypedAsyncFn<Trip[]>(async () => {
    try {
      const res = await webClient.get(`/trips`);
      dispatch({ type: "UPDATE_TRIPS", payload: res.data });
      return res.data;
    } catch (error) {
      toast.error(t("trips.getAllError"));
      return [];
    }
  }, []);
};
