import { FC } from "react";
import { Property as PropertyPrisma } from "@prisma/client";
import { useTranslations } from "next-intl";
import { Typography } from "../base/typography";
import { Grid } from "@mantine/core";
import { PropertyItem } from "./property-item";
import { Property } from "@/types/property";

type Props = {
  items: PropertyPrisma[] | undefined;
  isLoading: boolean;
};

export const PropertyWrapper: FC<Props> = (props) => {
  const { t, items, isLoading } = usePropertyWrapper(props);

  if (isLoading) {
    return <Typography>loading...</Typography>;
  }

  if (items?.length === 0) {
    return <Typography>there are no items.</Typography>;
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
  const t = useTranslations();

  return { t, items, isLoading };
}
