import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useGetTrips } from "./useGetTrips";

export const useShareTrip = () => {
  const webClient = useWebClient();
  const { t } = useTranslation();
  const [, getTrips] = useGetTrips();

  return useTypedAsyncFn(async (tripId: string) => {
    const promise = webClient.patch(`/trips/${tripId}`, {
      isShared: true
    });
    toast.promise(promise, {
      success: t("share.success"),
      error: t("share.sharingError"),
      loading: t("share.loading")
    });
    try {
      await promise;
      await navigator.clipboard.writeText(
        `${process.env.REACT_APP_URI}/share/${tripId}`
      );
      await getTrips();
    } catch {
      return;
    }
  }, []);
};
