"use client";

import { FC } from "react";
import { Stack, useMantineTheme } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { Typography } from "../base/typography";
import { useTranslations } from "next-intl";

export const NoUserError: FC = () => {
  const { t, theme } = useNoUserError();

  return (
    <Stack h="100%" align="center" justify="center">
      <IconX size={72} color={theme.colors.red[8]} />
      <Typography component="h2">{t("error")}</Typography>
    </Stack>
  );
};

function useNoUserError() {
  const t = useTranslations("user");
  const theme = useMantineTheme();

  return { t, theme };
}
