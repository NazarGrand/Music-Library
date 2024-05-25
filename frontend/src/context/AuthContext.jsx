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

  const registrationUser = async (userName, email, password) => {
    try {
      const response = await authService.registration(
        userName,
        email,
        password
      );
    } catch (e) {
      throw new Error(e.response?.data.message);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await authService.fetchUser();
      if (!response.data.user) {
        logout();
        return;
      }
      setUser(response.data.user);
    } catch (e) {
      logout();
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
