import { FC, ReactNode } from "react";
import { useCategoryQuery } from "@/hooks/use-category-query";
import { useIntl } from "@/hooks/use-intl";
import { generateLocaleTranslation } from "@/utils/objects";
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import { Category } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

type Props = {
  categories: Category[];
  children: ReactNode;
};

export const CategoriesSpotlight: FC<Props> = (props) => {
  const { t, children, actions } = useCategoriesSpotlight(props);

  return (
    <SpotlightProvider
      shortcut="mod + K"
      actions={actions}
      searchPlaceholder={t("searchPlaceholder")}
      searchIcon={<IconSearch size={20} />}
      nothingFoundMessage={t("emptyMessage")}
      radius="md"
      highlightQuery
    >
      {children}
    </SpotlightProvider>
  );
};

function useCategoriesSpotlight({ categories, children }: Props) {
  const t = useTranslations("home.categories.spotlight");
  const { locale } = useIntl();
  const [, { handleSelect }] = useCategoryQuery();

  const actions: SpotlightAction[] = categories.map(({ id, name, emoji }) => ({
    title: generateLocaleTranslation(name, locale),
    icon: emoji,
    onTrigger: () => handleSelect(id),
  }));

  return { t, children, actions };
}
