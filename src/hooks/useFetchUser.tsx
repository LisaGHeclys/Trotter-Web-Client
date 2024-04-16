import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import { AxiosResponse } from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../reducers/routes";

export const useFetchUser = (noNavigate = false) => {
  const webClient = useWebClient(noNavigate);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return useTypedAsyncFn(async () => {
    try {
      const rep: AxiosResponse = await webClient.get(`/user/me`);
      dispatch({ type: "SET_USER", payload: rep.data });
    } catch (error) {
      if (
        location.pathname !== PATHS.LOGIN &&
        location.pathname !== PATHS.REGISTER
      ) {
        toast.dismiss();
        toast.error(t("user.fetchError"));
        navigate(PATHS.LOGIN);
      }
    }
  }, []);
};
