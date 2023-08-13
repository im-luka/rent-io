import createIntlMiddleware from "next-intl/middleware";
import { DEFAULT_LOCALE, LOCALES } from "./utils/constants";

export default createIntlMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
