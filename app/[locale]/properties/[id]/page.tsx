"use client";

import { useTranslations } from "next-intl";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types/property";
import { propertyQuery } from "@/domain/queries/property-query";
import { PageLoading } from "@/app/_components/page-loading";
import { PageError } from "@/app/_components/page-error";

type Props = {
  params: {
    id: string;
    locale: string;
  };
};

export default function PropertyDetailsPage(props: Props) {
  const { t, property, isLoading, isError } = usePropertyDetailsPage(props);

  if (isError) {
    return <PageError />;
  }

  if (isLoading) {
    return <PageLoading />;
  }

  return <Stack>tu sam</Stack>;
}

function usePropertyDetailsPage({ params: { id } }: Props) {
  const t = useTranslations();

  const {
    data: property,
    isLoading,
    isError,
  } = useQuery<Property>({
    queryKey: propertyQuery.key(id),
    queryFn: () => propertyQuery.fnc(id),
  });

  console.log(property);

  return { t, property, isLoading, isError };
}
