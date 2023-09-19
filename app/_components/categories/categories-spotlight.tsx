import { FC, ReactNode, useState } from "react";
import { useCategoryQuery } from "@/hooks/use-category-query";
import { useIntl } from "@/hooks/use-intl";
import { generateLocaleTranslation } from "@/utils/objects";
import { Box } from "@mantine/core";
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import { Category } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";

type Props = {
  categories: Category[];
  children: ReactNode;
};

export const CategoriesSpotlight: FC<Props> = (props) => {
  const { children, actions } = useCategoriesSpotlight(props);

  const [value, setValue] = useState("");

  return (
    <SpotlightProvider
      shortcut="mod + K"
      actions={actions}
      searchPlaceholder="Search category..."
      searchIcon={<IconSearch size={20} />}
      nothingFoundMessage="Category not found..."
      radius="md"
      onQueryChange={(e) => setValue(e)}
      highlightQuery
      // actionComponent={value && (
      //   <Box></Box>
      // )}
    >
      {children}
    </SpotlightProvider>
  );
};

function useCategoriesSpotlight({ categories, children }: Props) {
  const { locale } = useIntl();
  const [, { handleSelect }] = useCategoryQuery();

  const actions: SpotlightAction[] = categories.map(({ id, name, emoji }) => ({
    title: generateLocaleTranslation(name, locale),
    icon: emoji,
    onTrigger: () => handleSelect(id),
  }));

  return { children, actions };
}
