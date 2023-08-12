"use client";

import { Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("metadata.home");

  return (
    <>
      <h1>Rent.io - Hello World!</h1>
      <p>{t("description")}</p>
      <Stack>
        <Text>Text #01</Text>
        <Text mt="xl">Text #02</Text>
      </Stack>
    </>
  );
}
