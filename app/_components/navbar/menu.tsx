"use client";

import { FC, Fragment, ReactNode } from "react";
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
  IconBookmark,
  IconBuildingEstate,
  IconChevronDown,
  IconDoorEnter,
  IconHeart,
  IconLogout,
  IconMessage,
  IconUserEdit,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { paths } from "@/navigation/paths";
import { signOut } from "next-auth/react";
import { Typography } from "../base/typography";
import { useSession } from "@/hooks/use-session";
import { useIntl } from "@/hooks/use-intl";

type MenuItem = {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  header?: ReactNode;
};

export const Menu: FC = () => {
  const { t, classes, user, menuItems } = useMenu();

  const renderMenuItem = (
    { icon, label, onClick, header }: MenuItem,
    i: number
  ) => (
    <Fragment key={i}>
      {header}
      <MantineMenu.Item icon={icon} onClick={onClick}>
        {label}
      </MantineMenu.Item>
    </Fragment>
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
                {user?.name ??
                  t.rich("userData", {
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                  })}
              </Typography>
            )}
            <IconChevronDown size={14} />
          </Group>
        </UnstyledButton>
      </MantineMenu.Target>
      <MantineMenu.Dropdown>
        {menuItems.map(renderMenuItem)}
      </MantineMenu.Dropdown>
    </MantineMenu>
  );
};

function useMenu() {
  const t = useTranslations("navbar.menu");
  const { classes, theme } = useStyles();
  const { router } = useIntl();
  const { session } = useSession();
  const user = session?.user;

  const menuItems: MenuItem[] = user
    ? [
        {
          icon: (
            <IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />
          ),
          label: t("favorites"),
          onClick: () => router.push(paths.favorites()),
        },
        {
          icon: (
            <IconBuildingEstate
              size={14}
              color={theme.colors.violet[6]}
              stroke={1.5}
            />
          ),
          label: t("myProperties"),
          onClick: () => router.push(paths.userProperties(user.id)),
        },
        {
          icon: (
            <IconBookmark
              size={14}
              color={theme.colors.yellow[6]}
              stroke={1.5}
            />
          ),
          label: t("myReservations"),
          onClick: () => router.push(paths.home()),
        },
        {
          icon: (
            <IconMessage size={14} color={theme.colors.blue[6]} stroke={1.5} />
          ),
          label: t("myReviews"),
          onClick: () => router.push(paths.home()),
        },
        {
          icon: (
            <IconUserEdit
              size={14}
              color={theme.colors.green[5]}
              stroke={1.5}
            />
          ),
          label: t("profile"),
          onClick: () => router.push(paths.home()),
          header: (
            <>
              <MantineMenu.Divider />
              <MantineMenu.Label>{t("accountSettings")}</MantineMenu.Label>
            </>
          ),
        },
        {
          icon: (
            <IconLogout size={14} color={theme.colors.red[5]} stroke={1.5} />
          ),
          label: t("signOut"),
          onClick: () => signOut(),
        },
      ]
    : [
        {
          icon: (
            <IconDoorEnter
              size={14}
              color={theme.colors.blue[5]}
              stroke={1.5}
            />
          ),
          label: t("login"),
          onClick: () => router.push(paths.login()),
          header: <MantineMenu.Label>{t("auth")}</MantineMenu.Label>,
        },
        {
          icon: (
            <IconBallpen size={14} color={theme.colors.green[5]} stroke={1.5} />
          ),
          label: t("register"),
          onClick: () => router.push(paths.register()),
        },
      ];

  return { t, classes, user, menuItems };
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
