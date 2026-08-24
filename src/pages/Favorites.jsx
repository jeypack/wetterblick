import React from "react";
import { useUserData } from "../hooks/useUserData";

const Favorites = () => {
  const { favorites } = useUserData();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((location) => (
            <div
              key={location.id}
              className="bg-white dark:bg-neutral-800 flex items-baseline justify-center rounded-lg shadow p-4"
            >
              <p>{location.latitude} / {location.longitude}</p>
              <h2 className="text-xl font-semibold ml-2 mr-2">{location.name}</h2>
              <p>{location.country}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;