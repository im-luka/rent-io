import { FC } from "react";
import { Box, Breadcrumbs, Group, Stack, createStyles } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Typography } from "../base/typography";
import { generateLocaleTranslation } from "@/utils/objects";
import { Address, Prisma, Review } from "@prisma/client";
import { meanBy } from "lodash";
import { useIntl } from "@/hooks/use-intl";
import { formatAddress } from "@/utils/address";
import Image from "next/image";
import { FavoriteButton } from "../favorite-button";
import { useSession } from "@/hooks/use-session";

type Props = {
  id: string;
  name: Prisma.JsonValue;
  imageSrc: string;
  address: Address;
  reviews: Review[];
};

export const PropertyHeader: FC<Props> = (props) => {
  const {
    t,
    id,
    classes,
    isAuthenticated,
    name,
    imageSrc,
    address,
    averageRating,
    reviewsCount,
  } = usePropertyHeader(props);

  return (
    <Stack spacing="xl">
      <Group position="apart" align="flex-end">
        <Stack spacing="xs">
          <Typography component="h1">{name}</Typography>
          <Breadcrumbs separator={t("symbol.round")}>
            <Typography size="sm">
              {t.rich("property.header.rating", { value: averageRating })}
            </Typography>
            <Typography size="sm">
              {t.rich("property.header.reviewsCount", {
                count: reviewsCount,
              })}
            </Typography>
            <Typography size="sm">{address}</Typography>
          </Breadcrumbs>
        </Stack>
        {isAuthenticated && <FavoriteButton propertyId={id} />}
      </Group>
      <Box h={375} pos="relative">
        <Image src={imageSrc} alt={name} fill className={classes.image} />
      </Box>
    </Stack>
  );
};

function usePropertyHeader({ id, name, imageSrc, address, reviews }: Props) {
  const t = useTranslations();
  const { classes } = useStyles();
  const { locale } = useIntl();
  const { isAuthenticated } = useSession();

  const averageRating = (meanBy(reviews, "rating") || 0).toFixed(2);

  return {
    t,
    id,
    classes,
    isAuthenticated,
    name: generateLocaleTranslation(name, locale),
    imageSrc,
    address: formatAddress(address),
    reviewsCount: reviews.length,
    averageRating,
  };
}

const useStyles = createStyles((theme) => ({
  image: {
    objectFit: "cover",
    borderRadius: theme.radius.lg,
  },
}));
