"use client";

import { FC } from "react";
import { Stack, useMantineTheme } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { Typography } from "./base/typography";
import { useTranslations } from "next-intl";

type Props = {
  message?: string;
};

export const PageError: FC<Props> = (props) => {
  const { theme, message } = usePageError(props);

  return (
    <Stack h="100%" align="center" justify="center">
      <IconX size={72} color={theme.colors.red[8]} />
      <Typography component="h2">{message}</Typography>
    </Stack>
  );
};

function usePageError({ message: msg }: Props) {
  const t = useTranslations("global");
  const theme = useMantineTheme();

  const message = msg ?? t("error");

  return { theme, message };
}
