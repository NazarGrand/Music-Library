import api from "./AxiosService";

export const login = async (email, password) => {
  return await api.post("/auth/login", { email, password });
};

export const registration = async (userName, email, password) => {
  return await api.post("/auth/registration", { userName, email, password });
};

export const fetchUser = async () => {
  return await api.get("/auth/me");
};

export const verifyUser = async (token) => {
  return await api.post("/auth/verify-user", { token });
};
