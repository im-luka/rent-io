import { FC } from "react";
import { Button, Group } from "@mantine/core";

type Props = {
  handlePrevButton: () => void;
};

export const Actions: FC<Props> = ({ handlePrevButton }) => {
  return (
    <Group position="center" spacing="xs" px="md" mt="xl">
      <Button variant="subtle" onClick={handlePrevButton}>
        Back
      </Button>
      <Button type="submit">Next</Button>
    </Group>
  );
};
