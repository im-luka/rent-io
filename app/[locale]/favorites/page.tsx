"use client";

import { Link } from "@/app/_components/base/link";
import { Typography } from "@/app/_components/base/typography";
import { PropertyWrapper } from "@/app/_components/properties/property-wrapper";
import { favoritesQuery } from "@/domain/queries/favorites-query";
import { paths } from "@/navigation/paths";
import { Property } from "@/types/property";
import { Button, Group, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export default function FavoritesPage() {
  const { t, properties, isLoading } = useFavoritesPage();

  return (
    <Stack m="md">
      <Group mt="sm" position="apart">
        <Stack spacing="xs">
          <Typography component="h1">{t("title")}</Typography>
          <Typography italic opacity={0.75}>
            {t("description")}
          </Typography>
        </Stack>
        <Button
          component={Link}
          href={paths.home()}
          leftIcon={<IconPlus size={16} />}
        >
          {t("addMoreAction")}
        </Button>
      </Group>
      <PropertyWrapper
        properties={{ pagination: null, properties: properties ?? [] }}
        isLoading={isLoading}
        disablePagination
        emptyTitle={t("empty.title")}
        emptyDescription={t("empty.description")}
      />
    </Stack>
  );
}

function useFavoritesPage() {
  const t = useTranslations("favorites");

  const { data: properties, isLoading } = useQuery<Property[]>(
    favoritesQuery.key
  );

  return { t, properties, isLoading };
}
