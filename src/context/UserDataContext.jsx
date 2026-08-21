// src/context/UserDataContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "../firebase/user.repo";
import { useAuth } from "./AuthContext";

export const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  const { user } = useAuth();

  const [userName, setUserName] = useState("");
  const [recentLocations, setRecentLocations] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      // If no user is logged in, reset the state to default values
      if (!user) {
        setUserName("");
        setRecentLocations([]);
        setFavorites([]);
        return;
      }

      const userData = await getUserData(user.uid);

      setUserName(userData?.username || "");
      setRecentLocations(userData?.recentLocations || []);
      setFavorites(userData?.favorites || []);
    }

    fetchUserData();
  }, [user]);

  return (
    <UserDataContext.Provider
      value={{
        userName,
        recentLocations,
        favorites,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
