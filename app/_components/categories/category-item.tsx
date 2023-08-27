import { FC } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useIntl } from "@/hooks/use-intl";
import { Button, createStyles } from "@mantine/core";
import { Category } from "@prisma/client";

type Props = {
  item: Category;
};

export const CategoryItem: FC<Props> = ({ item: { name, emoji } }) => {
  const { classes, locale } = useCategoryItem();

  return (
    <Button
      variant="subtle"
      size="sm"
      fw={500}
      className={classes.categoryItem}
    >
      {emoji} {(name as Record<string, string>)[locale]}
    </Button>
  );
};

function useCategoryItem() {
  const [{ isDarkTheme }] = useColorScheme();
  const { classes } = useStyles(isDarkTheme);
  const { locale } = useIntl();

  return { classes, locale };
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
}));
