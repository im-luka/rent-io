import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Providers } from "../_components/providers";
import { getTranslator } from "next-intl/server";
import { Navbar } from "../_components/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/domain/auth";
import { useLocale } from "next-intl";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

type Metadata = { params: { locale: string } };
export async function generateMetadata({ params: { locale } }: Metadata) {
  const t = await getTranslator(locale, "metadata.home");
  return {
    title: t("title"),
    description: t("description"),
    icons: [{ rel: "icon", url: "images/logo.png" }],
  };
}

export default async function RootLayout({ children, params }: Props) {
  // TODO: handle useLocal without eslint disable
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const locale = useLocale();
  if (params.locale !== locale) {
    notFound();
  }
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const session = await getServerSession(authOptions);

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={messages} session={session}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
