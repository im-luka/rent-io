"use client";

import { FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Logo: FC = () => {
  const { t } = useLogo();

  return (
    <Image
      src="/images/logo.png"
      alt={t("logoAlt")}
      width={102}
      height={102}
      priority
    />
  );
};

function useLogo() {
  const t = useTranslations("navbar");

  return { t };
}
