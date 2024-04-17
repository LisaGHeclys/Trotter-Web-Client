import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useGetTripFromId = () => {
  const webClient = useWebClient();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useTypedAsyncFn<string>(async (tripId: string) => {
    try {
      const res = await webClient.get(`/trips/${tripId}`);
      return res.data;
    } catch (error) {
      toast.error(t("share.error"));
      navigate("/");
      return;
    }
  }, []);
};
