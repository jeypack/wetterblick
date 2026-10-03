import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

/**
 * Firestore structure for the "users" collection.
 *
 * users (Collection)
 * │
 * ├── Document ID: user1
 * │   ├── email: "user@gmail.com"
 * │   ├── favorites: [...]
 * │   └── recentLocations: [...]
 * │
 * └── Document ID: user2
 *     ├── email: "other@gmail.com"
 *     ├── favorites: [...]
 *     └── recentLocations: [...]
 */

// Document des Users
function getUserDocument(uid) {
  return doc(db, "users", uid);
}

// User-Daten laden
export async function getUserData(uid) {
  const snapshot = await getDoc(getUserDocument(uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function getUserRecentLocations(uid) {
  const data = await getUserData(uid);
  return data ? data.recentLocations || [] : [];
}

// User-Daten initial anlegen
export function createUserData(uid, favorites = [], recentLocations = []) {
  return setDoc(getUserDocument(uid), {
    favorites,
    recentLocations,
  });
}

// Favorites aktualisieren
export function saveFavorites(uid, favorites) {
  return updateDoc(getUserDocument(uid), {
    favorites,
  });
}

// Recent Locations aktualisieren
export function saveRecentLocations(uid, recentLocations) {
  return updateDoc(getUserDocument(uid), {
    recentLocations,
  });
}
