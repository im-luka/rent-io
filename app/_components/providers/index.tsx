import { FC, ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "./theme";

type Props = {
  locale: string;
  children: ReactNode;
};

export const Providers: FC<Props> = async ({ locale, children }) => {
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>{children}</ThemeProvider>
    </NextIntlClientProvider>
  );
};
