import { FC, ReactNode } from "react";
import { Stack, useMantineTheme } from "@mantine/core";
import { useColorScheme } from "@/hooks/use-color-scheme";

type Props = {
  children: ReactNode;
};

export const FormContainer: FC<Props> = ({ children }) => {
  const { theme, isDarkTheme } = useFormContainer();

  return (
    <Stack
      align="center"
      px="sm"
      py="xl"
      m="xs"
      bg={isDarkTheme ? theme.colors.dark[6] : theme.colors.gray[0]}
      sx={{ borderRadius: theme.radius.md }}
    >
      {children}
    </Stack>
  );
};

function useFormContainer() {
  const theme = useMantineTheme();
  const [{ isDarkTheme }] = useColorScheme();

  return { theme, isDarkTheme };
}
