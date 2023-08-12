import { MantineThemeOverride, rem } from "@mantine/core";

export const spacing: Pick<MantineThemeOverride, "spacing"> = {
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },
};
