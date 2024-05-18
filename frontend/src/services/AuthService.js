import api from "../http";

export const login = async (email, password) => {
  return api.post("/login", { email, password });
};

export const registration = async (email, password) => {
  return api.post("/registration", { email, password });
};

export const fetchUser = async () => {
  return api.get("/me");
};
