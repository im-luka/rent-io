import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Providers } from "../_components/providers";
import { getTranslator } from "next-intl/server";
import { Navbar } from "../_components/navbar";
import { ReactNode } from "react";

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

export default function RootLayout({ children, params }: Props) {
  const locale = useLocale();
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
