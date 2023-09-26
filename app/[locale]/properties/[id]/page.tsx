"use client";

import { useTranslations } from "next-intl";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types/property";
import { propertyQuery } from "@/domain/queries/property-query";
import { PageLoading } from "@/app/_components/page-loading";
import { PageError } from "@/app/_components/page-error";
import { PropertyHeader } from "@/app/_components/properties/property-header";

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

  return (
    <Stack m="md">
      <PropertyHeader
        name={property?.name!}
        imageSrc={property?.imageSrc!}
        address={property?.address!}
        reviews={property?.reviews!}
      />
    </Stack>
  );
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

  return { t, property, isLoading, isError };
}
