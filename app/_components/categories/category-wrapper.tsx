"use client";

import { FC } from "react";
import {
  ActionIcon,
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
import { Category } from "@prisma/client";
import { SEARCH_CATEGORIES_KEY } from "@/utils/constants";
import { useTranslations } from "next-intl";
import { CategoryItem } from "./category-item";
import { ModalType } from "@/hooks/use-modal";

type Props = {
  categories: Category[] | undefined;
  onOpen: (type: ModalType) => void;
};

export const CategoryWrapper: FC<Props> = ({ categories, onOpen }) => {
  const { t, classes } = useCategoryWrapper();

  const renderCategory = (item: Category) => (
    <CategoryItem key={item.id} item={item} />
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
              <Typography>{SEARCH_CATEGORIES_KEY}</Typography>
            </Code>
          }
        />
      </Navbar.Section>
      <Navbar.Section className={classes.categoriesBlock}>
        <Divider />
        <Group position="apart" px="xs">
          <Typography size="xs">{t("title")}</Typography>
          <Tooltip label={t("create.tooltip")} position="right" withArrow>
            <ActionIcon
              variant="default"
              size={18}
              onClick={() => onOpen("addCategory")}
            >
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
  const t = useTranslations("home.categories");
  const { classes } = useStyles();

  return { t, classes };
}

const useStyles = createStyles((theme) => ({
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
}));
