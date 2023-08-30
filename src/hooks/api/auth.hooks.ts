import { AxiosResponse } from "axios";
import { useTypedAsyncFn } from "../useTypedAsyncFn";
import { useDispatch } from "react-redux";
import { useWebClient } from "../useWebClient";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../reducers/routes";

export const useLoginClient = () => {
  const webClient = useWebClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useTypedAsyncFn<{ email: string; password: string }>(
    async (payload) => {
      try {
        const rep: AxiosResponse<{
          accessToken: string;
        }> = await webClient.post("/auth/login", payload);
        localStorage.setItem("jwt", rep.data.accessToken);
        dispatch({ type: "LOGIN", payload: rep.data.accessToken });
        navigate(PATHS.TRAVEL);
      } catch (error) {
        console.error("Error while Logging in user");
      }
    },
    []
  );
};

export const useRegisterClient = () => {
  const webClient = useWebClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useTypedAsyncFn<{ email: string; password: string }>(
    async (payload) => {
      try {
        const rep: AxiosResponse<{
          accessToken: string;
        }> = await webClient.post("/auth/register", payload);
        localStorage.setItem("jwt", rep.data.accessToken);
        dispatch({ type: "LOGIN", payload: rep.data.accessToken });
        navigate(PATHS.TRAVEL);
      } catch (error) {
        console.error("Error while registering in user");
      }
    },
    []
  );
};
