import { useSearchParams } from "next/navigation";
import qs from "query-string";
import { useIntl } from "./use-intl";

type ReturnObject = {
  categoryId: string | null;
  isActive: boolean;
};

export const useCategoryQuery = (
  id?: string
): [
  obj: ReturnObject,
  fnc: { handleSelect: (categoryId?: string) => void }
] => {
  const { router, pathname } = useIntl();
  const searchParams = useSearchParams();

  const paramsCategoryId = searchParams.get("category");
  const isActive = paramsCategoryId === id;

  const handleSelect = (categoryId?: string) => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { category: isActive ? null : categoryId ?? id },
      },
      { skipNull: true }
    );
    router.replace(url, { scroll: false });
  };

  return [{ categoryId: paramsCategoryId, isActive }, { handleSelect }];
};
