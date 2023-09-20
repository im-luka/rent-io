"use client";

import { FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "../base/link";
import { paths } from "@/navigation/paths";

export const Logo: FC = () => {
  const { t } = useLogo();

  return (
    <Link href={paths.home()} scroll={false}>
      <Image
        src="/images/logo.png"
        alt={t("logoAlt")}
        width={102}
        height={102}
        priority
      />
    </Link>
  );
};

function useLogo() {
  const t = useTranslations("navbar");

  return { t };
}
