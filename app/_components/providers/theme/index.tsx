"use client";

import { FC, ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  MantineProvider,
  MantineThemeOverride,
  useEmotionCache,
} from "@mantine/core";
import { spacing } from "./spacing";

type Props = {
  children: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
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
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={cache}
      theme={theme}
    >
      {children}
    </MantineProvider>
  );
};

const theme: MantineThemeOverride = {
  spacing: { ...spacing },
};
