import { MantineThemeOverride, px, rem } from "@mantine/core";
import { Work_Sans } from "next/font/google";

const baseFont = Work_Sans({ subsets: ["latin"] });

const baseFontSize = 16;
const baseHeadingFontWeight = 600;

const lineHeights = {
  xs: 18,
  sm: 20,
  md: 22,
  lg: 22,
  xl: 24,
};
const headingLineHeights = {
  h1: 40,
  h2: 34,
  h3: 28,
  h4: 24,
};

export const calculateLineHeight = (size: keyof typeof lineHeights) =>
  lineHeights[size] / px(typography.fontSizes![size]);

type TypographyProps = Pick<
  MantineThemeOverride,
  "fontFamily" | "lineHeight" | "fontSizes" | "headings" | "fontFamilyMonospace"
>;
export const typography: TypographyProps = {
  fontFamily: baseFont.style.fontFamily,
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(baseFontSize),
    lg: rem(18),
    xl: rem(20),
  },
  lineHeight: lineHeights.md / baseFontSize,
  headings: {
    fontWeight: baseHeadingFontWeight,
    sizes: {
      h1: {
        fontSize: rem(32),
        lineHeight: headingLineHeights.h1 / 32,
      },
      h2: {
        fontSize: rem(28),
        lineHeight: headingLineHeights.h2 / 28,
      },
      h3: {
        fontSize: rem(22),
        lineHeight: headingLineHeights.h3 / 22,
      },
      h4: {
        fontSize: rem(20),
        lineHeight: headingLineHeights.h4 / 20,
      },
    },
  },
};
