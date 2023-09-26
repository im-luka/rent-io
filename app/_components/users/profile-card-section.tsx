import { FC } from "react";
import { Group, Stack } from "@mantine/core";
import { Typography } from "../base/typography";

export type ProfileCardSectionOption = {
  label: string;
  value: string | number | null | undefined;
};

type Props = {
  title: string;
  options: ProfileCardSectionOption[];
};

export const ProfileCardSection: FC<Props> = ({ title, options }) => {
  const renderOption = (
    { label, value }: ProfileCardSectionOption,
    i: number
  ) => (
    <Group key={i} spacing="xs">
      <Typography size="sm">{label}</Typography>
      <Typography fw={600}>{value}</Typography>
    </Group>
  );

  return (
    <Stack h="100%" spacing="md">
      <Typography component="h4" color="gray.5" italic underline>
        {title}
      </Typography>
      <Stack spacing="xs">{options.map(renderOption)}</Stack>
    </Stack>
  );
};
