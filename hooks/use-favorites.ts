import { favoritesMutation } from "@/domain/mutations/favorites-mutation";
import { FavoriteAction, generateFavorites } from "@/utils/user";
import {
  UseMutateFunction,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "./use-session";
import { useNotification } from "./use-notification";
import { FAVORITES_QUERY_KEY } from "@/domain/queries/favorites-query";
import { Property } from "@/types/property";

export const useFavorites = (): [
  data: {
    isFavorite: (id: string) => boolean;
    toggleFavorite: UseMutateFunction<
      FavoriteAction,
      unknown,
      string | undefined,
      unknown
    >;
  },
  mutationObj: UseMutationResult<
    FavoriteAction,
    unknown,
    string | undefined,
    unknown
  >
] => {
  const { onSuccess } = useNotification();
  const { session, update } = useSession();
  const user = session?.user;
  const qc = useQueryClient();

  const mutationObj = useMutation(favoritesMutation.fnc, {
    onSuccess: async (action: FavoriteAction, propertyId) => {
      await update({
        favoriteIds: generateFavorites(user?.favoriteIds!, propertyId!),
      });
      onSuccess()(action === FavoriteAction.ADDED ? "favorite" : "unfavorite");
      qc.setQueryData([FAVORITES_QUERY_KEY], (data: Property[] = []) =>
        data.filter((el) => el.id !== propertyId)
      );
    },
  });

  const isFavorite = (id: string) => user?.favoriteIds?.includes(id) ?? false;

  return [{ isFavorite, toggleFavorite: mutationObj.mutate }, mutationObj];
};
