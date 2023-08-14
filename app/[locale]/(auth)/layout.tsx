import { Box } from "@mantine/core";
import { ReactNode } from "react";
import { LayoutContainer } from "./_components/layout-container";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return <LayoutContainer>{children}</LayoutContainer>;
}
