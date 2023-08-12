"use client";

import { Button, Stack } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Typography } from "../_components/mantine/typography";

export default function HomePage() {
  const t = useTranslations("metadata.home");

  return (
    <>
      <h1>Rent.io - Hello World!</h1>
      <p>{t("description")}</p>
      <Stack>
        <Button>click</Button>
        <Typography>I am Lux</Typography>
      </Stack>
    </>
  );
}
