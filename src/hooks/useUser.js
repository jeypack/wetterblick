import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook to access the user context.
 * @returns {{user: object|null, login: (userData: object) => void, logout: () => void}} The current user and authentication functions.
 * @example const { user, login, logout } = useUser();
 */
export function useUser() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUser must be used inside AuthProvider");
  }

  return context;
}