"use client";

import { FC } from "react";
import {
  ActionIcon,
  Button,
  Code,
  Divider,
  Group,
  Navbar,
  Stack,
  TextInput,
  Tooltip,
  createStyles,
  rem,
} from "@mantine/core";
import { Typography } from "../base/typography";
import { IconCommand, IconPlus, IconSearch } from "@tabler/icons-react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Category } from "@prisma/client";
import { useIntl } from "@/hooks/use-intl";

type Props = {
  categories: Category[] | undefined;
};

export const CategoryWrapper: FC<Props> = ({ categories }) => {
  const { classes, locale } = useCategoryWrapper();

  const renderCategory = ({ id, name, emoji }: Category) => (
    <Button
      key={id}
      variant="subtle"
      size="sm"
      fw={500}
      className={classes.categoryItem}
    >
      {emoji} {(name as Record<string, string>)[locale]}
    </Button>
  );

  return (
    <Navbar className={classes.wrapper}>
      <Navbar.Section>
        <TextInput
          size="xs"
          px="xs"
          pt="xs"
          icon={<IconSearch size={16} />}
          rightSection={
            <Code className={classes.codeBlock}>
              <IconCommand size={12} />
              <Typography>K</Typography>
            </Code>
          }
        />
      </Navbar.Section>
      <Navbar.Section className={classes.categoriesBlock}>
        <Divider />
        <Group position="apart" px="xs">
          <Typography size="xs">Categories</Typography>
          <Tooltip label="Create category" position="right" withArrow>
            <ActionIcon variant="default" size={18}>
              <IconPlus size={14} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <Stack spacing={0}>{categories?.map(renderCategory)}</Stack>
      </Navbar.Section>
    </Navbar>
  );
};

function useCategoryWrapper() {
  const [{ isDarkTheme }] = useColorScheme();
  const { classes } = useStyles(isDarkTheme);
  const { locale } = useIntl();

  return { classes, locale };
}

const useStyles = createStyles((theme, isDarkTheme: boolean) => ({
  wrapper: {
    minWidth: rem(200),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.xl,
  },

  categoriesBlock: {
    paddingInline: theme.spacing.xs,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
  },

  codeBlock: {
    marginRight: theme.spacing.xs,
    display: "flex",
    alignItems: "center",
    gap: rem(3),
    cursor: "pointer",
  },

  categoryItem: {
    display: "flex",
    padding: theme.spacing.xs,
    color: isDarkTheme ? theme.colors.gray[5] : theme.colors.gray[7],
    ":hover": {
      color: isDarkTheme ? theme.colors.gray[1] : theme.colors.dark[9],
      backgroundColor: isDarkTheme
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    },
  },
}));
