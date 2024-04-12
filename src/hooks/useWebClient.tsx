import axios, {
  AxiosHeaderValue,
  AxiosInstance,
  AxiosResponse,
  HeadersDefaults
} from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PATHS } from "../reducers/routes";

const API_BASE_URL = process.env.REACT_APP_SERVER_URI;

export class CustomAxiosInstance {
  private static axiosInstance: AxiosInstance | null = null;
  private static axiosLoginInstance: AxiosInstance | null = null;
  public static getInstance = (): AxiosInstance => {
    if (CustomAxiosInstance.axiosInstance) {
      return CustomAxiosInstance.axiosInstance;
    } else {
      CustomAxiosInstance.axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 60000,
        headers: {}
      });
      return CustomAxiosInstance.axiosInstance;
    }
  };
  public static getLoginInstance = (): AxiosInstance => {
    if (CustomAxiosInstance.axiosLoginInstance) {
      return CustomAxiosInstance.axiosLoginInstance;
    } else {
      CustomAxiosInstance.axiosLoginInstance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 60000,
        headers: {}
      });
      return CustomAxiosInstance.axiosLoginInstance;
    }
  };
}

export const useWebClient = (preventNavigate = false): AxiosInstance => {
  const instance = CustomAxiosInstance.getInstance();
  let navigate: NavigateFunction;

  if (!preventNavigate) {
    navigate = useNavigate();
  }

  const token = localStorage.getItem("jwt") || undefined;

  if (token) {
    instance.defaults.headers = {
      Authorization: `Bearer ${token}`
    } as unknown as HeadersDefaults & {
      [key: string]: AxiosHeaderValue;
    };
  }
  // 401 Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    (error: any) => {
      if (401 === error.response?.status && !preventNavigate) {
        console.log("Unauthorized, redirected to login page");

        navigate(PATHS.LOGIN);
        throw error;
      } else {
        console.log("Error", error);
        throw error;
      }
    }
  );
  return instance;
};
