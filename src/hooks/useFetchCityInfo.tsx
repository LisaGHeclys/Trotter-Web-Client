import { useWebClient } from "./useWebClient";
import { useTypedAsyncFn } from "./useTypedAsyncFn";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

export const useFetchCityInfo = () => {
  const webClient = useWebClient();

  return useTypedAsyncFn<{
    slug: string;
  }>(async (payload) => {
    try {
      const rep: AxiosResponse = await webClient.get(`/IA/${payload.slug}`);
      console.log(rep.data.categories);
      return rep.data.categories;
    } catch (error) {
      toast.error("Couldn't fetch the city info. Try again later.");
      return null;
    }
  }, []);
};
