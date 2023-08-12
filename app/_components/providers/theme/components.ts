import type { MantineThemeOverride } from "@mantine/core";

export const components: Pick<MantineThemeOverride, "components"> = {
  components: {
    Text: {
      styles: {
        root: {
          margin: 0,
        },
      },
    },
  },
};
