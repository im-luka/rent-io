"use client";

import { FC, ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { MantineProvider, useEmotionCache } from "@mantine/core";

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
    <MantineProvider withGlobalStyles withNormalizeCSS emotionCache={cache}>
      {children}
    </MantineProvider>
  );
};
