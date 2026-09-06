// src/context/UserDataContext.jsx
import { createContext, useEffect, useRef, useState } from "react";
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

const getLocationKey = (location) => {
  if (!location) {
    return null;
  }

  if (location.id) {
    return String(location.id);
  }

  if (location.latitude != null && location.longitude != null) {
    return `${location.latitude}-${location.longitude}`;
  }

  return null;
};

const UserDataProvider = ({ children }) => {
  const { user } = useAuth();
  const previousUserRef = useRef(null);
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
    async function fetchUserData() {
      const previousUser = previousUserRef.current;

      if (!user) {
        if (previousUser) {
          setRecentLocations([]);
          setFavorites([]);
        }
        previousUserRef.current = null;
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const userData = await getUserData(user.uid);
      const persistedRecentLocations = userData?.recentLocations || [];
      const mergedRecentLocations = [
        ...recentLocations.filter(
          (location) => !persistedRecentLocations.some((item) => getLocationKey(item) === getLocationKey(location)),
        ),
        ...persistedRecentLocations,
      ];

      setRecentLocations(mergedRecentLocations);
      setFavorites(userData?.favorites || []);
      setIsLoading(false);
      previousUserRef.current = user;
    }

    fetchUserData();
  }, [user]);

  return (
    <UserDataContext.Provider
      value={{
        user,
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
