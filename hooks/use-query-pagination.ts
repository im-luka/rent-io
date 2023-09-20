import { useSearchParams } from "next/navigation";
import qs from "query-string";
import { useIntl } from "./use-intl";
import { parseSearchParamsToObject } from "@/utils/objects";

export type QueryParams = {
  page?: number;
  perPage?: number;
  category?: string | null;
};

export const useQueryPagination = (): [
  obj: QueryParams,
  fnc: {
    addToQuery: (params?: QueryParams) => void;
  }
] => {
  const { pathname, router } = useIntl();
  const searchParams = useSearchParams();

  const queryParams = parseSearchParamsToObject(searchParams);

  const addToQuery = (params?: QueryParams) => {
    const updatedQuery = { ...queryParams, ...params };
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.replace(url, { scroll: false });
  };

  return [
    {
      page: Number(queryParams.page),
      perPage: Number(queryParams.perPage),
      category: queryParams.category,
    },
    {
      addToQuery,
    },
  ];
};
