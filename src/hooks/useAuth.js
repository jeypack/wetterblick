import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

/**
 * Custom hook to access the authentication context.
 * @returns {{user: object|null, isLoading: boolean}} The current user and loading state.
 * @example const { user, isLoading } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}