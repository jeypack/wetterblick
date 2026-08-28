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
    return favorites.some((fav) => fav.location.id === location.id);
  };

  const updateRecentLocations = async (location) => {
    // Firestore aktualisieren
    const existingLocation = recentLocations.find((item) => item.id === location.id);
    let updatedLocations;
    if (existingLocation) {
      // Move the existing location to the front of the list
      updatedLocations = [
        existingLocation,
        ...recentLocations.filter((item) => item.id !== location.id),
      ];
    } else {
      updatedLocations = [location, ...recentLocations].slice(0, 20); // Keep only the last 20 locations
    }
    try {
      setRecentLocations(updatedLocations);
      // Update Firestore
      if (user) {
        await saveRecentLocations(user.uid, updatedLocations);
      }
    } catch (error) {
      // ggf. State zurücksetzen / Toast anzeigen
    }
  };

  const updateFavorites = async (favorite) => {
    // Firestore aktualisieren
    const hasFavorite = favorites.some((item) => item.location.id === favorite.location.id);
    let updatedFavorites;
    if (hasFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.location.id !== favorite.location.id);
    } else {
      updatedFavorites = [...favorites, favorite];
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
    //console.log("UserDataProvider: user", user);
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
      console.log("UserDataProvider: userData", userData);
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
