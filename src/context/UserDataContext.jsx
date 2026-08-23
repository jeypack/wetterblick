// src/context/UserDataContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getUserData, saveRecentLocations, saveFavorites } from "../firebase/user.repo";
import { useAuth } from "./AuthContext";

export const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  const { user } = useAuth();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [recentLocations, setRecentLocations] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const updateRecentLocations = async (location) => {
    // Firestore aktualisieren
    const hasLocation = recentLocations.some((item) => item.id === location.id);
    if (!hasLocation) {
      const updatedLocations = [location, ...recentLocations].slice(0, 20); // Keep only the last 20 locations
      try {
        setRecentLocations(updatedLocations);
        setCurrentLocation(location);
        // Update Firestore
        if (user) {
          await saveRecentLocations(user.uid, updatedLocations);
        }
      } catch (error) {
        // ggf. State zurücksetzen / Toast anzeigen
      }
    }
  };

  const updateFavorites = async (location) => {
    // Firestore aktualisieren
    const hasFavorite = favorites.some((item) => item.id === location.id);
    let updatedFavorites;
    if (hasFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== location.id);
    } else {
      updatedFavorites = [...favorites, location];
    }
    try {
      setFavorites(updatedFavorites);
      // Update Firestore
      if (user) {
        await saveFavorites(user.uid, updatedFavorites);
      }
    } catch (error) {
      // ggf. State zurücksetzen / Toast anzeigen
    }
  };

  // useEffect to fetch user data when the user changes
  useEffect(() => {
    async function fetchUserData() {
      // If no user is logged in, reset the state to default values
      if (!user) {
        //setCurrentLocation(null);
        setRecentLocations([]);
        setFavorites([]);
        return;
      }

      const userData = await getUserData(user.uid);

      setCurrentLocation(userData?.currentLocation || null);
      setRecentLocations(userData?.recentLocations || []);
      setFavorites(userData?.favorites || []);
    }

    fetchUserData();
  }, [user]);

  return (
    <UserDataContext.Provider
      value={{
        currentLocation,
        recentLocations,
        favorites,
        updateRecentLocations,
        updateFavorites,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
