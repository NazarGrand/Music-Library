import api from "./AxiosService";

export const login = async (email, password) => {
  return await api.post("/auth/login", { email, password });
};

export const registration = async (email, password) => {
  return await api.post("/auth/registration", { email, password });
};

export const fetchUser = async () => {
  return await api.get("/auth/me");
};
