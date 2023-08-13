import createIntlMiddleware from "next-intl/middleware";
import { DEFAULT_LOCALE, LOCALES } from "./utils/constants";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return createIntlMiddleware({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  })(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
