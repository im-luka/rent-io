import { FC } from "react";
import { Button, Group, useMantineTheme } from "@mantine/core";
import { IconPlus, IconWorldPin } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export const Actions: FC = () => {
  const t = useTranslations("navbar.actions");
  const theme = useMantineTheme();

  return (
    <Group spacing="xs">
      <Button
        variant="gradient"
        gradient={{ from: theme.colors.indigo[5], to: theme.colors.indigo[3] }}
        leftIcon={<IconWorldPin size={16} />}
      >
        {t("startExploring")}
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: theme.colors.indigo[3], to: theme.colors.indigo[5] }}
        leftIcon={<IconPlus size={16} />}
      >
        {t("addService")}
      </Button>
    </Group>
  );
};
