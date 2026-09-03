// src/context/UserDataContext.jsx
import { createContext, useEffect, useState } from "react";
import { getUserData, saveRecentLocations, saveFavorites } from "../firebase/user.repo";
import { useAuth } from "../hooks/useAuth";

const UserDataContext = createContext(null);

export { UserDataContext };

const getFavoriteId = (favorite) => {
  if (!favorite) {
    return null;
  }

  if (typeof favorite === "string") {
    return favorite;
  }

  if (favorite.id) {
    return String(favorite.id);
  }

  if (favorite.location) {
    const { latitude, longitude } = favorite.location;
    if (latitude != null && longitude != null) {
      return `${latitude}-${longitude}`;
    }
  }

  return null;
};

const UserDataProvider = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [recentLocations, setRecentLocations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isComparing, setIsComparing] = useState(true);

  const isFavorite = (location) => {
    return favorites.some((fav) => getFavoriteId(fav) === getFavoriteId({ location }));
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

  const updateFavorites = async (favoriteObj) => {
    const safeFavorite = { ...favoriteObj };
    const favoriteId = getFavoriteId(safeFavorite);

    if (!favoriteId) {
      return;
    }

    safeFavorite.id = favoriteId;

    const updatedFavorites = favorites.some((item) => getFavoriteId(item) === favoriteId)
      ? favorites.map((item) => (getFavoriteId(item) === favoriteId ? { ...item, ...safeFavorite } : item))
      : [...favorites, safeFavorite];

    try {
      setFavorites(updatedFavorites);
      if (user) {
        await saveFavorites(user.uid, updatedFavorites);
      }
    } catch (error) {
      // ggf. State zurücksetzen / Toast anzeigen
    }
  };

  const deleteFavorite = async (favorite) => {
    const favoriteId = getFavoriteId(favorite);

    if (!favoriteId) {
      return;
    }

    const updatedFavorites = favorites.filter((item) => getFavoriteId(item) !== favoriteId);

    try {
      setFavorites(updatedFavorites);
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
      //console.log("UserDataProvider: userData", userData);
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
        deleteFavorite,
        isComparing,
        setIsComparing,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
