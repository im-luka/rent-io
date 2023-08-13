import { forwardRef } from "react";
import { Anchor, AnchorProps } from "@mantine/core";
import { LinkProps as NextLinkProps } from "next/link";
import NextIntlLink from "next-intl/link";

type Props = AnchorProps &
  NextLinkProps & {
    locale?: string;
  };

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
  props,
  ref
) {
  return (
    <Anchor
      component={NextIntlLink}
      underline={false}
      color="unset"
      {...props}
      ref={ref}
    />
  );
});
