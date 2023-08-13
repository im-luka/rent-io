"use client";

import { FC } from "react";
import { Box, Group, Header, createStyles } from "@mantine/core";
import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { Menu } from "./menu";
import { Actions } from "./actions";

export const Navbar: FC = () => {
  const { t, classes } = useNavbar();

  return (
    <Header height={82}>
      <Group h="100%" px="xl" pos="relative" position="apart">
        <Box className={classes.zIndex}>
          <Actions />
        </Box>
        <Box className={classes.logoBlock}>
          <Logo />
        </Box>
        <Box className={classes.zIndex}>
          <Group>
            <Menu />
          </Group>
        </Box>
      </Group>
    </Header>
  );
};

function useNavbar() {
  const t = useTranslations("navbar");
  const { classes } = useStyles();

  return { t, classes };
}

const useStyles = createStyles((theme) => ({
  logoBlock: {
    position: "absolute",
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  zIndex: {
    zIndex: 1,
  },
}));
