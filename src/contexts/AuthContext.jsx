import { createContext, useContext, useState } from "react";
import { authMock } from "@/services/authMock";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authMock.currentUser());
  const login = async (phone) => {
    const res = await authMock.loginAs(phone);
    setUser(res.user);
  };
  const logout = async () => {
    await authMock.logout();
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
