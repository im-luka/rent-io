"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Loader, Stack } from "@mantine/core";
import { Typography } from "./base/typography";

export const PageLoading: FC = () => {
  const { t } = usePageLoading();

  return (
    <Stack h="100%" justify="center" align="center" spacing="sm">
      <Loader size="lg" />
      <Typography size="lg" lts={1} fw={600}>
        {t("loading")}
      </Typography>
    </Stack>
  );
};

function usePageLoading() {
  const t = useTranslations("global");

  return { t };
}
