import { QueryParams } from "@/hooks/use-query-pagination";

export const PROPERTIES_QUERY_KEY = "properties";

export const propertiesQuery = {
  key: (params?: QueryParams) => [PROPERTIES_QUERY_KEY, params],
};
