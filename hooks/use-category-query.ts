import { useSearchParams } from "next/navigation";
import qs from "query-string";
import { useIntl } from "./use-intl";

export const useCategoryQuery = (
  id?: string
): [data: boolean, fnc: { handleSelect: (categoryId?: string) => void }] => {
  const { router, pathname } = useIntl();
  const searchParams = useSearchParams();

  const isActive = searchParams.get("category") === id;

  const handleSelect = (categoryId?: string) => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { category: isActive ? null : categoryId ?? id },
      },
      { skipNull: true }
    );
    router.replace(url);
  };

  return [isActive, { handleSelect }];
};
