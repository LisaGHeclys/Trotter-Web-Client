import axios, {
  AxiosHeaderValue,
  AxiosInstance,
  AxiosResponse,
  HeadersDefaults
} from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../reducers/auth.reducers";
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

export const useWebClient = (): AxiosInstance => {
  const instance = CustomAxiosInstance.getInstance();
  const navigate = useNavigate();

  const token = useSelector(getUserToken);
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
      if (401 === error.response?.status) {
        console.log("Unauthorized, redirected to login page");
        navigate(PATHS.LOGIN);
      } else {
        throw error;
      }
    }
  );
  return instance;
};