import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import { AxiosResponse } from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export const useFetchUser = (noNavigate = false) => {
  const webClient = useWebClient(noNavigate);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return useTypedAsyncFn(async () => {
    try {
      const rep: AxiosResponse = await webClient.get(`/user/me`);
      dispatch({ type: "SET_USER", payload: rep.data });
    } catch (error) {
      toast.error(t("user.fetchError"));
    }
  }, []);
};
