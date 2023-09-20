import { QueryParams } from "@/hooks/use-query-pagination";
import { Prisma } from "@prisma/client";
import { ReadonlyURLSearchParams } from "next/navigation";

export const parseFormDataToObject = <T>(formData: FormData) => {
  const obj: Record<string, any> = {};
  formData.forEach((val, k) => {
    const key = k.replace("[]", "");
    if (!Reflect.has(obj, key)) {
      obj[key] = val;
      return;
    }
    if (!Array.isArray(obj[key])) {
      obj[key] = [obj[key]];
    }
    obj[key].push(val);
  });
  return obj as T;
};

export const parseSearchParamsToObject = (
  searchParams: URLSearchParams | ReadonlyURLSearchParams
) => {
  let queryParams: Partial<QueryParams> = {};
  searchParams.forEach((value, key) => {
    queryParams = { ...queryParams, [key]: value };
  });
  return queryParams;
};

export const parseSortParamToObject = (sortObj: string) => {
  if (!sortObj) {
    return;
  }
  const [field, value] = sortObj.split(":") as [string, "asc" | "desc"];
  return { [field]: value };
};

export const generateLocaleTranslation = (
  value: Prisma.JsonValue,
  locale: string
) => {
  return (value as Record<string, string>)[locale];
};
