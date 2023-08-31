import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next-intl/client";

export const useIntl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return { router, pathname, locale };
};
