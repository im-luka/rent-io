"use client";

import { FC } from "react";
import { Text, TextProps, Title, TitleOrder, TitleProps } from "@mantine/core";
import { calculateLineHeight } from "../providers/theme/typography";

type TitleVariant = "h1" | "h2" | "h3" | "h4";
type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

const p = "p";
const span = "span";

type Props =
  | (Omit<TitleProps, "order" | "size"> & {
      component?: TitleVariant;
      size?: never;
    })
  | (Omit<TextProps, "span" | "size"> & {
      component?: typeof p | typeof span;
      size?: TextSize;
    });

export const Typography: FC<Props> = ({ component = p, ...restProps }) => {
  if (component === "p" || component === "span") {
    const size = restProps.size ?? "md";
    return (
      <Text
        {...restProps}
        component={component}
        span={component === "span"}
        lh={restProps.lh ?? calculateLineHeight(size)}
      />
    );
  }
  return <Title {...restProps} order={Number(component[1]) as TitleOrder} />;
};
