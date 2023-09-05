import worldCountries from "world-countries";

type Country = {
  id: string;
  flag: string;
  latlng: [number, number];
  name: string;
  region: string;
};

const countries: Country[] = worldCountries.map(
  ({ cca2, flag, latlng, name, region }) => ({
    id: cca2,
    flag,
    latlng,
    name: name.common,
    region,
  })
);

export const useCountries = (): [
  countries: Country[],
  fnc: { getCountry: (id: string) => Country | undefined }
] => {
  const getCountry = (id: string) =>
    countries.find((country) => country.id === id);

  return [countries, { getCountry }];
};
