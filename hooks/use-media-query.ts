import { MantineNumberSize, useMantineTheme } from "@mantine/core";
import { useMediaQuery as useMantineMediaQuery } from "@mantine/hooks";

type Condition = "smallerThan" | "largerThan";

export const useMediaQuery = (
  breakpoint: MantineNumberSize,
  condition: Condition
) => {
  const theme = useMantineTheme();
  const bp = theme.fn[condition](breakpoint);

  return useMantineMediaQuery(bp.split(" ").slice(1).join(" "));
};
