import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const useSaveTrip = () => {
  const webClient = useWebClient();
  const { t } = useTranslation();

  return useTypedAsyncFn<{
    startDate: number;
    endDate: number;
    housingCoordinates: number[];
    cityName: string;
    tripData: object;
  }>(async (payload) => {
    const promise = webClient.post(`/trips`, payload);
    toast.promise(promise, {
      success: t("trips.saveSuccess"),
      error: t("trips.saveError"),
      loading: t("trips.saveLoading")
    });
    await promise;
  }, []);
};
