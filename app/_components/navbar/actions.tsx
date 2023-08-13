import { FC } from "react";
import { Button, Group, useMantineTheme } from "@mantine/core";
import { IconPlus, IconWorldPin } from "@tabler/icons-react";

export const Actions: FC = () => {
  const theme = useMantineTheme();

  return (
    <Group spacing="xs">
      <Button
        variant="gradient"
        gradient={{ from: theme.colors.indigo[5], to: theme.colors.indigo[3] }}
        leftIcon={<IconWorldPin size={16} />}
      >
        Start Exploring
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: theme.colors.indigo[3], to: theme.colors.indigo[5] }}
        leftIcon={<IconPlus size={16} />}
      >
        Add Service
      </Button>
    </Group>
  );
};
