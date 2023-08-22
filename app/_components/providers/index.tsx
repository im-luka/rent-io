"use client";

import { FC, ReactNode } from "react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "./theme";
import { QueryClientProvider } from "./query-client-provider";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  locale: string;
  messages: AbstractIntlMessages;
  session: Session | undefined | null;
  children: ReactNode;
};

export const Providers: FC<Props> = ({
  locale,
  messages,
  session,
  children,
}) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionProvider session={session}>
        <ThemeProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
};
