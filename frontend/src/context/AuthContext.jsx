import { createContext, useContext, useState } from "react";
import * as authService from "../services/AuthService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      console.log(response.data.accessToken);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {};

  const registrationUser = async (email, password) => {
    try {
      const response = await authService.registration(email, password);
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registrationUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
