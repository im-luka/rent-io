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
  IconHeart,
  IconLogout,
  IconMessage,
  IconStar,
  IconUserEdit,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { paths } from "@/navigation/paths";
import { Link } from "../base/link";
import { useSession } from "next-auth/react";
import { Typography } from "../base/typography";

export const Menu: FC = () => {
  const { t, classes, theme, user } = useMenu();

  // TODO: 🖌️ implement cleaner menu items once other pages are ready & complete
  const menuItems = user ? (
    <>
      <MantineMenu.Item
        icon={<IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />}
      >
        Liked posts
      </MantineMenu.Item>
      <MantineMenu.Item
        icon={
          <IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />
        }
      >
        Saved posts
      </MantineMenu.Item>
      <MantineMenu.Item
        icon={
          <IconMessage size={14} color={theme.colors.blue[6]} stroke={1.5} />
        }
      >
        Your comments
      </MantineMenu.Item>
      <MantineMenu.Divider />
      <MantineMenu.Label>{t("accountSettings")}</MantineMenu.Label>
      <MantineMenu.Item
        icon={
          <IconUserEdit size={14} stroke={1.5} color={theme.colors.green[5]} />
        }
      >
        {t("profile")}
      </MantineMenu.Item>
      <MantineMenu.Item
        icon={<IconLogout size={14} stroke={1.5} color={theme.colors.red[5]} />}
      >
        {t("signOut")}
      </MantineMenu.Item>
    </>
  ) : (
    <>
      <MantineMenu.Item icon={<IconDoorEnter size={14} stroke={1.5} />}>
        <Link href={paths.login()}>{t("login")}</Link>
      </MantineMenu.Item>
      <MantineMenu.Item icon={<IconBallpen size={14} stroke={1.5} />}>
        <Link href={paths.register()}>{t("register")}</Link>
      </MantineMenu.Item>
    </>
  );

  return (
    <MantineMenu position="bottom-end">
      <MantineMenu.Target>
        <UnstyledButton>
          <Group className={classes.targetBlock}>
            <Avatar
              size="sm"
              variant="light"
              radius="xl"
              color="indigo"
              src={user?.image}
            />
            {user && (
              <Typography size="sm">
                {t.rich("userData", {
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                })}
              </Typography>
            )}
            <IconChevronDown size={14} />
          </Group>
        </UnstyledButton>
      </MantineMenu.Target>
      <MantineMenu.Dropdown>{menuItems}</MantineMenu.Dropdown>
    </MantineMenu>
  );
};

function useMenu() {
  const t = useTranslations("navbar.menu");
  const { classes, theme } = useStyles();
  const { data: session } = useSession();
  const user = session?.user;

  return { t, classes, theme, user };
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
