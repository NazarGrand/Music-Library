import { createContext, useContext, useState } from "react";
import * as authService from "../services/AuthService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.data.user);

      const token = response.data.accessToken;
      localStorage.setItem("token", token);
    } catch (e) {
      throw new Error(e.response?.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const registrationUser = async (email, password) => {
    try {
      const response = await authService.registration(email, password);
      console.log(response.data);
    } catch (e) {
      return e.response?.data;
    }
  };

  const fetchUser = async () => {
    try {
      const response = await authService.fetchUser();
      setUser(response.data.user);
    } catch (e) {
      return e.response;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, registrationUser, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
