import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import { AxiosResponse } from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const useFetchCityInfo = () => {
  const webClient = useWebClient();
  const { t } = useTranslation();

  return useTypedAsyncFn<{
    slug: string;
  }>(async (payload) => {
    try {
      const rep: AxiosResponse = await webClient.get(`/IA/${payload.slug}`);
      console.log(rep.data.categories);
      return rep.data.categories;
    } catch (error) {
      toast.error(t("map.cityDetailsError"));
      return null;
    }
  }, []);
};
