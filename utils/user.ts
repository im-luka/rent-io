export enum FavoriteAction {
  ADDED = "added",
  REMOVED = "removed",
}

export const isPropertyFavored = (favorites: string[], propertyId: string) => {
  return favorites.find((id) => id === propertyId);
};

export const generateFavorites = (
  currFavorites: string[],
  propertyId: string
) => {
  const isFavored = isPropertyFavored(currFavorites, propertyId);
  return isFavored
    ? currFavorites.filter((id) => id !== propertyId)
    : [...(currFavorites ?? []), propertyId];
};

export const getFirstName = (name?: string | null) => name?.split(" ")[0] ?? "";
