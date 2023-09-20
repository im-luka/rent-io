const PROPERTIES_QUERY_KEY = "properties";

export type PropertiesQueryType = {
  categoryId: string | null;
};

export const propertiesQuery = {
  key: (params?: PropertiesQueryType) => {
    if (params && Object.values(params).filter((i) => !!i).length) {
      return [PROPERTIES_QUERY_KEY, params];
    }
    return [PROPERTIES_QUERY_KEY];
  },
};
