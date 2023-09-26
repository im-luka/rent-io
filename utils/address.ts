import { Address } from "@prisma/client";

export const formatAddress = ({ city, county, country }: Address) =>
  `${city}, ${county ?? ""}, ${country}`;

export const formatFullAddress = ({
  city,
  county,
  country,
  street,
  postalCode,
}: Address) => `${street}, ${city}, ${county ?? ""} ${postalCode}, ${country}`;
