"use client";

import { FC, ReactNode, useLayoutEffect, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
  rem,
  useEmotionCache,
} from "@mantine/core";
import { spacing } from "./spacing";
import { colors } from "./colors";
import { typography } from "./typography";
import { components } from "./components";
import { getCookie, setCookie } from "cookies-next";

const COLOR_SCHEME_COOKIE = "color-scheme";

type Props = {
  children: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie(COLOR_SCHEME_COOKIE, nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

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

  useLayoutEffect(() => {
    const cookie = getCookie(COLOR_SCHEME_COOKIE) as ColorScheme;
    setColorScheme(cookie);
  }, []);

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
