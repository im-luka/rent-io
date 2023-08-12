"use client";

import { FC, ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

type Props = {
  locale: string;
  children: ReactNode;
};

export const Providers: FC<Props> = async ({ locale, children }) => {
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
