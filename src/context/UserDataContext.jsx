// src/context/UserDataContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getUserData, saveRecentLocations, saveFavorites } from "../firebase/user.repo";
import { useAuth } from "../hooks/useAuth";

const UserDataContext = createContext(null);
export { UserDataContext };

const UserDataProvider = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [recentLocations, setRecentLocations] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const isFavorite = (location) => {
    return favorites.some((fav) => fav.id === location.id);
  };

  const updateRecentLocations = async (location) => {
    // Firestore aktualisieren
    const hasLocation = recentLocations.some((item) => item.id === location.id);
    if (!hasLocation) {
      const updatedLocations = [location, ...recentLocations].slice(0, 20); // Keep only the last 20 locations
      try {
        setRecentLocations(updatedLocations);
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
        setRecentLocations([]);
        setFavorites([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const userData = await getUserData(user.uid);

      setRecentLocations(userData?.recentLocations || []);
      setFavorites(userData?.favorites || []);
      setIsLoading(false);
    }

    fetchUserData();
  }, [user]);

  return (
    <UserDataContext.Provider
      value={{
        isFavorite,
        isLoading,
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

export default UserDataProvider;
