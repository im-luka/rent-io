import { ReactNode } from "react";
import { LayoutContainer } from "./_components/layout-container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/domain/auth";
import { redirect } from "next-intl/server";
import { paths } from "@/navigation/paths";

type Props = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(paths.home());
  }

  return <LayoutContainer>{children}</LayoutContainer>;
}
