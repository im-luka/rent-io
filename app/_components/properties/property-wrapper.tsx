import { FC } from "react";
import { Property as PropertyPrisma } from "@prisma/client";
import { useTranslations } from "next-intl";
import { Typography } from "../base/typography";
import { Button, Flex, Grid, Stack } from "@mantine/core";
import { PropertyItem } from "./property-item";
import { Property } from "@/types/property";
import { SkeletonCards } from "../skeleton-cards";
import { HOME_PROPERTIES_PER_PAGE } from "@/utils/constants";
import { useIntl } from "@/hooks/use-intl";
import { paths } from "@/navigation/paths";
import { useSearchParams } from "next/navigation";

type Props = {
  items: PropertyPrisma[] | undefined;
  isLoading: boolean;
};

export const PropertyWrapper: FC<Props> = (props) => {
  const { t, items, isLoading, handleResetFilters } = usePropertyWrapper(props);

  // TODO: WIP - properties empty state manual render
  const searchParams = useSearchParams();
  const hasParams = searchParams.get("category");

  if (isLoading) {
    return <SkeletonCards cardsCount={HOME_PROPERTIES_PER_PAGE} />;
  }

  if (!items?.length || hasParams) {
    return (
      <Flex w="100%" h="100%" align="center" justify="center">
        <Stack align="center" spacing="xs">
          <Typography component="h3" fw={600}>
            {t("empty.title")}
          </Typography>
          <Typography size="sm">{t("empty.description")}</Typography>
          <Button
            w="100%"
            mt="lg"
            variant="outline"
            onClick={handleResetFilters}
          >
            {t("empty.resetAction")}
          </Button>
        </Stack>
      </Flex>
    );
  }

  return (
    <Grid m="xs" gutter="lg">
      {items?.map((item) => (
        <PropertyItem key={item.id} item={item as Property} />
      ))}
    </Grid>
  );
};

function usePropertyWrapper({ items, isLoading }: Props) {
  const t = useTranslations("home.properties");
  const { router } = useIntl();

  const handleResetFilters = () =>
    router.replace(paths.home(), { scroll: false });

  return { t, items, isLoading, handleResetFilters };
}
