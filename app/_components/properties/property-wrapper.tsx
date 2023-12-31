import { FC } from "react";
import { useTranslations } from "next-intl";
import { Typography } from "../base/typography";
import {
  Button,
  Flex,
  Grid,
  Group,
  Pagination,
  Select,
  SelectItem,
  Stack,
  rem,
} from "@mantine/core";
import { PropertyItem } from "./property-item";
import { PropertyWithPagination } from "@/types/property";
import { SkeletonCards } from "../skeleton-cards";
import {
  DEFAULT_PAGE,
  HOME_PROPERTIES_PER_PAGE,
  HOME_PROPERTIES_PER_PAGE_OPTIONS,
} from "@/utils/constants";
import { useIntl } from "@/hooks/use-intl";
import { paths } from "@/navigation/paths";
import { useQueryPagination } from "@/hooks/use-query-pagination";

type Props = {
  properties: PropertyWithPagination | undefined;
  isLoading: boolean;
  disablePagination?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
};

export const PropertyWrapper: FC<Props> = (props) => {
  const {
    t,
    properties,
    pagination,
    isLoading,
    sortValue,
    sortOptions,
    perPageOptions,
    disablePagination,
    emptyTitle,
    emptyDescription,
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
            {emptyTitle ?? t("empty.title")}
          </Typography>
          <Typography size="sm">
            {emptyDescription ?? t("empty.description")}
          </Typography>
          {!disablePagination && (
            <Button
              w="100%"
              mt="lg"
              variant="outline"
              onClick={handleResetFilters}
            >
              {t("empty.resetAction")}
            </Button>
          )}
        </Stack>
      </Flex>
    );
  }

  return (
    <Stack w="100%" mt="md" spacing={0}>
      {!disablePagination && (
        <Group position="apart" px="lg">
          <Group spacing="sm">
            <Typography size="sm" fw={600}>
              {t("pagination.sort.label")}
            </Typography>
            <Select
              value={sortValue ?? null}
              data={sortOptions}
              onChange={(val) => addToQuery({ sort: val })}
              clearable
            />
          </Group>
          <Group>
            <Typography>
              {t.rich("pagination.totalOf", {
                count: properties.length,
                total: pagination?.total,
              })}
            </Typography>
            <Pagination
              value={pagination?.page ?? DEFAULT_PAGE}
              total={pagination?.totalPages!}
              onChange={(page) => addToQuery({ page })}
            />
            <Select
              value={pagination?.perPage.toString() ?? perPageOptions[0].value}
              data={perPageOptions}
              onChange={(perPage) => addToQuery({ perPage: +perPage! })}
              w={rem(70)}
            />
          </Group>
        </Group>
      )}
      <Grid m="xs" gutter="lg">
        {properties?.map((property) => (
          <PropertyItem key={property.id} item={property} />
        ))}
      </Grid>
    </Stack>
  );
};

function usePropertyWrapper({
  properties: propertiesProp,
  isLoading,
  disablePagination,
  emptyTitle,
  emptyDescription,
}: Props) {
  const t = useTranslations("home.properties");
  const { properties, pagination } = propertiesProp ?? {};
  const { router } = useIntl();
  const [{ sort: sortValue }, { addToQuery }] = useQueryPagination();

  const sortOptions: SelectItem[] = [
    {
      value: "createdAt:desc",
      label: t("pagination.sort.newest"),
    },
    {
      value: "createdAt:asc",
      label: t("pagination.sort.oldest"),
    },
    {
      value: "price:asc",
      label: t("pagination.sort.priceLowHigh"),
    },
    {
      value: "price:desc",
      label: t("pagination.sort.priceHighLow"),
    },
  ];

  const perPageOptions: SelectItem[] = HOME_PROPERTIES_PER_PAGE_OPTIONS.map(
    (option) => ({
      value: option.toString(),
      label: option.toString(),
    })
  );

  const handleResetFilters = () =>
    router.replace(paths.home(), { scroll: false });

  return {
    t,
    properties,
    pagination,
    isLoading,
    sortValue,
    sortOptions,
    perPageOptions,
    disablePagination,
    emptyTitle,
    emptyDescription,
    addToQuery,
    handleResetFilters,
  };
}
