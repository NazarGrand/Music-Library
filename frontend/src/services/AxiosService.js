import axios from "axios";
import Cookies from "js-cookie";
import { memoizedRefreshToken } from "./RefreshTokenService";
import { ROUTES } from "../utils/routes";

export const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}`,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `${localStorage.getItem("token")}`;
  return config;
});

const refreshTokenInstance = axios.create({
  baseURL: `${API_URL}`,
});

export const axiosRefTokenInst = refreshTokenInstance;

refreshTokenInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (e) => {
    localStorage.removeItem("token");
    Cookies.remove("refreshToken", { path: "/", domain: "localhost" });

    if (window.location.pathname !== ROUTES.LOGIN) {
      window.location.replace(ROUTES.LOGIN);
    }
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    const errStatus = err?.response?.status;

    if (errStatus !== 401) {
      return Promise.reject(err);
    }

    const result = await memoizedRefreshToken();

    if (result) {
      originalConfig.headers = {
        ...originalConfig.headers,
        Authorization: result.accessToken,
      };
      return api(originalConfig);
    } else {
      return Promise.reject(err);
    }
  }
);

export default api;
