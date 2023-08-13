import { useRouter, usePathname } from "next-intl/client";
import { useLocale } from "next-intl";

export const useIntl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return { router, pathname, locale };
};
