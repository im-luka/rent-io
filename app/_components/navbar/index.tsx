"use client";

import { FC } from "react";
import { Box, Group, Header, createStyles } from "@mantine/core";
import { Logo } from "./logo";
import { Menu } from "./menu";
import { Actions } from "./actions";
import { ColorSchemeIcon } from "./color-scheme-icon";
import { InternationalizationSwitch } from "./internationalization-switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useIntl } from "@/hooks/use-intl";
import { paths } from "@/navigation/paths";

export const Navbar: FC = () => {
  const { classes, smallScreen, showActions } = useNavbar();

  return (
    <Header
      height={smallScreen ? "auto" : 82}
      mih={smallScreen ? "auto" : 82}
      pb={smallScreen ? "md" : "0"}
    >
      <Group className={classes.containerBlock}>
        <Box className={classes.actionsBlock}>{showActions && <Actions />}</Box>
        <Box className={classes.logoBlock}>
          <Logo />
        </Box>
        <Box className={classes.settingsBlock}>
          <Group spacing={smallScreen ? "xs" : "sm"}>
            <ColorSchemeIcon />
            <InternationalizationSwitch />
            <Menu />
          </Group>
        </Box>
      </Group>
    </Header>
  );
};

function useNavbar() {
  const { classes } = useStyles();
  const smallScreen = useMediaQuery("xs", "smallerThan");
  const { pathname } = useIntl();

  const showActions = pathname === paths.home();

  return { classes, smallScreen, showActions };
}

const useStyles = createStyles((theme) => ({
  containerBlock: {
    position: "relative",
    height: "100%",
    paddingInline: theme.spacing.xl,
    justifyContent: "space-between",
    [theme.fn.smallerThan("xs")]: {
      paddingInline: theme.spacing.xs,
      gap: 0,
    },
  },

  logoBlock: {
    order: -1,
    [theme.fn.largerThan("xs")]: {
      position: "absolute",
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },

  actionsBlock: {
    zIndex: 1,
    [theme.fn.smallerThan("xs")]: {
      order: 1,
      width: "100%",
    },
  },

  settingsBlock: {
    zIndex: 1,
  },
}));
