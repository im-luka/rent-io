import { FC } from "react";
import { Button, Group } from "@mantine/core";
import { useTranslations } from "next-intl";

type Props = {
  handlePrevButton: () => void;
};

export const Actions: FC<Props> = (props) => {
  const { t, handlePrevButton } = useActions(props);

  return (
    <Group position="center" spacing="xs" px="md" mt="xl">
      <Button variant="subtle" onClick={handlePrevButton}>
        {t("back")}
      </Button>
      <Button type="submit">{t("next")}</Button>
    </Group>
  );
};

function useActions({ handlePrevButton }: Props) {
  const t = useTranslations("home.propertyModal.actions");

  return { t, handlePrevButton };
}
