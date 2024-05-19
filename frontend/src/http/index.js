import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL; //`http://localhost:5000/auth`;

const api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/auth`,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `${localStorage.getItem("token")}`;
  return config;
});

export default api;
