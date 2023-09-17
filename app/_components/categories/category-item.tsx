"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useIntl } from "@/hooks/use-intl";
import { Button, createStyles } from "@mantine/core";
import { Category } from "@prisma/client";
import qs from "query-string";
import { generateLocaleTranslation } from "@/utils/objects";

type Props = {
  item: Category;
};

export const CategoryItem: FC<Props> = (props) => {
  const { classes, name, emoji, isActive, cx, handleClick } =
    useCategoryItem(props);

  return (
    <Button
      variant="subtle"
      size="sm"
      fw={500}
      className={cx(classes.categoryItem, {
        [classes.categoryItemActive]: isActive,
      })}
      onClick={handleClick}
    >
      {emoji} {name}
    </Button>
  );
};

function useCategoryItem({ item: { id, name, emoji } }: Props) {
  const [{ isDarkTheme }] = useColorScheme();
  const { classes, cx } = useStyles(isDarkTheme);
  const { locale, router, pathname } = useIntl();
  const searchParams = useSearchParams();

  const localeName = generateLocaleTranslation(name, locale);
  const isActive = searchParams.get("category") === id;

  const handleClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { category: isActive ? null : id },
      },
      { skipNull: true }
    );
    router.replace(url);
  };

  return { classes, name: localeName, emoji, isActive, cx, handleClick };
}

const useStyles = createStyles((theme, isDarkTheme: boolean) => ({
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
  categoryItemActive: {
    backgroundColor: isDarkTheme
      ? theme.colors.indigo[2]
      : theme.colors.indigo[5],
    color: isDarkTheme ? theme.colors.dark[9] : theme.white,
    ":hover": {
      backgroundColor: isDarkTheme
        ? theme.colors.indigo[2]
        : theme.colors.indigo[5],
      color: isDarkTheme ? theme.colors.dark[9] : theme.white,
    },
  },
}));
