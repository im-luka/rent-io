import { FC } from "react";
import { useTranslations } from "next-intl";
import { Typography } from "../base/typography";
import { Button, Flex, Grid, Group, Pagination, Stack } from "@mantine/core";
import { PropertyItem } from "./property-item";
import { PropertyWithPagination } from "@/types/property";
import { SkeletonCards } from "../skeleton-cards";
import { HOME_PROPERTIES_PER_PAGE } from "@/utils/constants";
import { useIntl } from "@/hooks/use-intl";
import { paths } from "@/navigation/paths";
import { useQueryPagination } from "@/hooks/use-query-pagination";

type Props = {
  properties: PropertyWithPagination | undefined;
  isLoading: boolean;
};

export const PropertyWrapper: FC<Props> = (props) => {
  const {
    t,
    properties,
    pagination,
    isLoading,
    addToQuery,
    handleResetFilters,
  } = usePropertyWrapper(props);

  if (isLoading) {
    return <SkeletonCards cardsCount={HOME_PROPERTIES_PER_PAGE} />;
  }

  if (!properties?.length) {
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
    <Stack mt="md" spacing={0}>
      <Group sx={{ alignSelf: "flex-end" }}>
        <Typography>
          {t.rich("pagination.totalOf", {
            count: pagination?.perPage,
            total: pagination?.total,
          })}
        </Typography>
        <Pagination
          total={pagination?.totalPages!}
          onChange={(page) => addToQuery({ page })}
        />
      </Group>
      <Grid w="100%" m="xs" gutter="lg">
        {properties?.map((property) => (
          <PropertyItem key={property.id} item={property} />
        ))}
      </Grid>
    </Stack>
  );
};

function usePropertyWrapper({ properties: propertiesProp, isLoading }: Props) {
  const t = useTranslations("home.properties");
  const { properties, pagination } = propertiesProp ?? {};
  const { router } = useIntl();
  const [, { addToQuery }] = useQueryPagination();

  const handleResetFilters = () =>
    router.replace(paths.home(), { scroll: false });

  return {
    t,
    properties,
    pagination,
    isLoading,
    addToQuery,
    handleResetFilters,
  };
}
