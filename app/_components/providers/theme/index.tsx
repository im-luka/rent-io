"use client";

import { FC, ReactNode, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
  rem,
  useEmotionCache,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { spacing } from "./spacing";
import { colors } from "./colors";
import { typography } from "./typography";
import { components } from "./components";

type Props = {
  children: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={cache}
        theme={{ colorScheme, ...theme }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

const theme: MantineThemeOverride = {
  ...spacing,
  ...colors,
  ...typography,
  ...components,
  cursorType: "pointer",
  transitionTimingFunction: "ease-out",
  loader: "oval",
  globalStyles: (theme) => ({
    body: {
      maxWidth: rem(2056),
      marginInline: "auto",
      paddingInline: theme.spacing.sm,
    },
  }),
};
