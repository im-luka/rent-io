"use client";

import { FC, ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./theme";

type Props = {
  locale: string;
  children: ReactNode;
};

export const Providers: FC<Props> = async ({ locale, children }) => {
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const queryClient = new QueryClient();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
};
