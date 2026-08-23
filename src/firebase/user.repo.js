import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

/* {
  email: "joerg@example.com",

  favorites: [
    {
      id: "51.4556-7.0116",
      name: "Essen",
      latitude: 51.4556,
      longitude: 7.0116
    },
    {
      id: "52.5200-13.4050",
      name: "Berlin",
      latitude: 52.5200,
      longitude: 13.4050
    }
  ],

  recentLocations: [
    {
      id: "51.4556-7.0116",
      name: "Essen",
      latitude: 51.4556,
      longitude: 7.0116
    }
  ]
} */
/* 
users (Collection)
│
├── Document ID: user1
│   ├── email: "user@example.com"
│   ├── favorites: [...]
│   └── recentLocations: [...]
│
└── Document ID: user2
    ├── email: "other@example.com"
    ├── favorites: [...]
    └── recentLocations: [...]
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
/* 
export async function getUserName(uid) {
  const data = getUserData(uid);
  return data ? data.username || "" : "";
}

export async function getUserFavorites(uid) {
  const data = await getUserData(uid);
  return data ? data.favorites || [] : [];
}
 */
export async function getUserRecentLocations(uid) {
  const data = await getUserData(uid);
  return data ? data.recentLocations || [] : [];
}

// User-Daten initial anlegen
export function createUserData(uid) {
  return setDoc(getUserDocument(uid), {
    favorites: [],
    recentLocations: [],
    currentLocation: null,
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
