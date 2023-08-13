import { ColorScheme, useMantineColorScheme } from "@mantine/core";

export const useColorScheme = (): [
  obj: { colorScheme: ColorScheme; isDarkTheme: boolean },
  fnc: { toggleColorScheme: (colorScheme?: ColorScheme | undefined) => void }
] => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === "dark";

  return [{ colorScheme, isDarkTheme }, { toggleColorScheme }];
};
