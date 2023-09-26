import { FC } from "react";
import { ActionIcon } from "@mantine/core";
import { useFavorites } from "@/hooks/use-favorites";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

type Props = {
  propertyId: string;
};

export const FavoriteButton: FC<Props> = (props) => {
  const { isFavorite, handleFavorite } = useFavoriteButton(props);

  return (
    <ActionIcon
      variant="default"
      radius="md"
      size={40}
      onClick={handleFavorite}
    >
      {isFavorite ? (
        <IconHeartFilled size={24} style={{ color: "red" }} />
      ) : (
        <IconHeart size={24} color="red" />
      )}
    </ActionIcon>
  );
};

function useFavoriteButton({ propertyId }: Props) {
  const [{ isFavorite, toggleFavorite }] = useFavorites();

  const handleFavorite = () => toggleFavorite(propertyId);

  return {
    isFavorite: isFavorite(propertyId),
    handleFavorite,
  };
}
