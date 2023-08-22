import { useTranslations } from "next-intl";

export const useCustomError = () => {
  const t = useTranslations("error");
  const customErrorPlaceholder = "custom.";

  const generateErrorMessage = (error: string) => {
    const isCustomError = error.includes(customErrorPlaceholder);
    if (!isCustomError) {
      return error;
    }
    return t(`${error.replace(customErrorPlaceholder, "")}`);
  };

  return { generateErrorMessage };
};
