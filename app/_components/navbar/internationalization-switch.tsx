"use client";

import { FC } from "react";
import {
  Box,
  Center,
  Group,
  MediaQuery,
  SegmentedControl,
} from "@mantine/core";
import { Typography } from "../mantine/typography";
import { useTranslations } from "next-intl";
import { useIntl } from "@/hooks/use-intl";
import { LOCALES } from "@/utils/constants";

export const InternationalizationSwitch: FC = () => {
  const { t, router, pathname, locale } = useInternationalizationSwitch();

  const localeLabel = (locale: string) => (
    <Center onClick={() => router.replace(pathname, { locale })}>
      <Box>{t(`${locale}.flag`)}</Box>
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Typography size="xs" ml={10}>
          {t(`${locale}.title`)}
        </Typography>
      </MediaQuery>
    </Center>
  );

  return (
    <Group>
      <SegmentedControl
        value={locale}
        data={LOCALES.map((value) => ({ value, label: localeLabel(value) }))}
        transitionDuration={0}
      />
    </Group>
  );
};

function useInternationalizationSwitch() {
  const t = useTranslations("navbar.intl");
  const { router, pathname, locale } = useIntl();

  return { t, router, pathname, locale };
}
