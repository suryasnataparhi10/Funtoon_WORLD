import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check cookie at first load
  useEffect(() => {
    const token = Cookies.get("token"); 
    if (token) setIsAuthenticated(true);
  }, []);

  const login = (token) => {
    Cookies.set("token", token, { expires: 7 }); // store for 7 days
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
