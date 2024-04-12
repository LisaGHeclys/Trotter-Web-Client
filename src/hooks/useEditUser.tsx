import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
import { User } from "../reducers/auth.reducers";
import { useFetchUser } from "./useFetchUser";

export const useEditUser = (noNavigate = false) => {
  const webClient = useWebClient(noNavigate);
  const { t } = useTranslation();
  const [, fetchUser] = useFetchUser();

  return useTypedAsyncFn<Partial<User>>(async (payload) => {
    const promise = webClient.patch(`/user/${payload.id}`, payload);
    toast.promise(promise, {
      error: t("user.editError"),
      success: t("user.modified"),
      loading: t("user.editLoading")
    });
    await promise;
    await fetchUser();
  }, []);
};
