"use client";

import { FC } from "react";
import {
  Avatar,
  Group,
  Menu as MantineMenu,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconBallpen,
  IconChevronDown,
  IconDoorEnter,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { paths } from "@/navigation/paths";
import { Link } from "../base/link";
import { useSession } from "next-auth/react";

export const Menu: FC = () => {
  const { t, classes } = useMenu();

  return (
    <MantineMenu position="bottom-end">
      <MantineMenu.Target>
        <UnstyledButton>
          <Group className={classes.targetBlock}>
            <Avatar size="sm" variant="light" radius="xl" color="indigo" />
            <IconChevronDown size={14} />
          </Group>
        </UnstyledButton>
      </MantineMenu.Target>
      <MantineMenu.Dropdown>
        <MantineMenu.Item icon={<IconDoorEnter size={14} stroke={1.5} />}>
          <Link href={paths.login()}>{t("login")}</Link>
        </MantineMenu.Item>
        <MantineMenu.Item icon={<IconBallpen size={14} stroke={1.5} />}>
          <Link href={paths.register()}>{t("register")}</Link>
        </MantineMenu.Item>
      </MantineMenu.Dropdown>
    </MantineMenu>
  );
};

function useMenu() {
  const t = useTranslations("navbar.menu");
  const { data: session } = useSession();
  const { classes } = useStyles();

  console.log(session?.user?.firstName);

  return { t, classes };
}

const useStyles = createStyles((theme) => ({
  targetBlock: {
    paddingBlock: rem(4),
    paddingInline: theme.spacing.md,
    border: "1px solid",
    borderColor: theme.colors.indigo[5],
    borderRadius: theme.radius.sm,
  },
}));
