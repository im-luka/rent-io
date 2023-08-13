"use client";

import { FC } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ActionIcon, createStyles } from "@mantine/core";
import { IconMoonStars, IconSunFilled } from "@tabler/icons-react";

export const ColorSchemeIcon: FC = () => {
  const [{ isDarkTheme }, { toggleColorScheme }] = useColorScheme();
  const { classes } = useStyles(isDarkTheme);

  return (
    <ActionIcon className={classes.icon} onClick={() => toggleColorScheme()}>
      {isDarkTheme ? <IconSunFilled size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
};

const useStyles = createStyles((theme, isDarkTheme: boolean) => ({
  icon: {
    color: isDarkTheme ? theme.colors.yellow[5] : theme.colors.indigo[5],
    backgroundColor: isDarkTheme
      ? theme.colors.dark[6]
      : theme.colors.indigo[0],
  },
}));
