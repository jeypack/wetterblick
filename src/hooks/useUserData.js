import {useContext} from "react";
import {UserDataContext} from "../context/UserDataContext";

/**
 * Custom hook to access the user data context.
 * @returns {{userName: string, recentLocations: array, favorites: array}} The current user data.
 * @example const { userName, recentLocations, favorites } = useUserData();
 */
export function useUserData() {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error("useUserData must be used inside UserDataProvider");
  }

  return context;
}