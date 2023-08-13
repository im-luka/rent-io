"use client";

import { FC } from "react";
import {
  Avatar,
  Button,
  Group,
  Menu as MantineMenu,
  UnstyledButton,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBallpen,
  IconChevronDown,
  IconDoorEnter,
} from "@tabler/icons-react";

export const Menu: FC = () => {
  const { classes, theme } = useStyles();

  return (
    <MantineMenu>
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
          Login
        </MantineMenu.Item>
        <MantineMenu.Item icon={<IconBallpen size={14} stroke={1.5} />}>
          Register
        </MantineMenu.Item>
      </MantineMenu.Dropdown>
    </MantineMenu>
  );
};

const useStyles = createStyles((theme) => ({
  targetBlock: {
    paddingBlock: rem(4),
    paddingInline: theme.spacing.md,
    border: "1px solid",
    borderColor: theme.colors.indigo[5],
    borderRadius: theme.radius.sm,
  },
}));
