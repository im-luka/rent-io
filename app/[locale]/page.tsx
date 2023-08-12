import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("metadata.home");

  return (
    <>
      <h1>Rent.io - Hello World!</h1>
      <p>{t("description")}</p>
    </>
  );
}
