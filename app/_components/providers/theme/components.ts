import { MODAL_OVERLAY_Z_INDEX } from "@/utils/constants";
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
    Modal: {
      styles: (theme) => ({
        overlay: {
          zIndex: MODAL_OVERLAY_Z_INDEX,
        },
        inner: {
          zIndex: MODAL_OVERLAY_Z_INDEX + 1,
        },
      }),
    },
  },
};
