import { Prisma } from "@prisma/client";

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

export const generateLocaleTranslation = (
  value: Prisma.JsonValue,
  locale: string
) => {
  return (value as Record<string, string>)[locale];
};
