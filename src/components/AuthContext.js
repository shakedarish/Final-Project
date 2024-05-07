import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, userName, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
