import { useState, useEffect, createContext, ReactNode } from "react";

// Define the shape of the context state
interface FavoritesContextState {
  favorites: { id: number; name: string }[];
  addFavorite: (name: string) => Promise<void>;
  updateFavorite: (id: number, name: string) => Promise<void>;
  deleteFavorite: (id: number) => Promise<void>;
}

// Create the context with the initial state
const FavoritesContext = createContext<FavoritesContextState | undefined>(
  undefined
);

const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    const response = await fetch("http://localhost:5000/favorites");
    const data = await response.json();
    setFavorites(data);
  };

  const addFavorite = async (newFavorite: string) => {
    await fetch("http://localhost:5000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newFavorite }),
    });
    getFavorites();
  };

  const updateFavorite = async (id: number, updatedName: string) => {
    await fetch(`http://localhost:5000/favorites/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedName }),
    });
    getFavorites();
  };

  const deleteFavorite = async (id: number) => {
    await fetch(`http://localhost:5000/favorites/${id}`, {
      method: "DELETE",
    });
    getFavorites();
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, updateFavorite, deleteFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesProvider, FavoritesContext };
