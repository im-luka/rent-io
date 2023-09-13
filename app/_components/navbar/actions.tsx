"use client";

import { FC } from "react";
import { Button, Group, createStyles } from "@mantine/core";
import { IconPlus, IconWorldPin } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Typography } from "../base/typography";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useModal } from "@/hooks/use-modal";

export const Actions: FC = () => {
  const { t, classes, theme, smallScreen, open } = useActions();

  return (
    <Group spacing="xs">
      <Button
        variant="gradient"
        gradient={{ from: theme.colors.indigo[5], to: theme.colors.indigo[3] }}
        className={classes.button}
      >
        <Group spacing="xs">
          <IconWorldPin size={16} />
          <Typography>
            {t(smallScreen ? "explore" : "startExploring")}
          </Typography>
        </Group>
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: theme.colors.indigo[3], to: theme.colors.indigo[5] }}
        className={classes.button}
      >
        <Group spacing="xs" onClick={() => open("addProperty")}>
          <IconPlus size={16} />
          <Typography>{t(smallScreen ? "add" : "addYours")}</Typography>
        </Group>
      </Button>
    </Group>
  );
};

function useActions() {
  const t = useTranslations("navbar.actions");
  const { classes, theme } = useStyles();
  const smallScreen = useMediaQuery("md", "smallerThan");
  const [, { open }] = useModal();

  return { t, classes, theme, smallScreen, open };
}

const useStyles = createStyles((theme) => ({
  button: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },
}));
