"use client";

import { Link } from "@/app/_components/base/link";
import { PageError } from "@/app/_components/page-error";
import { UserPropertiesWrapper } from "@/app/_components/users/user-properties-wrapper";
import { userQuery } from "@/domain/queries/user-query";
import { paths } from "@/navigation/paths";
import { Property } from "@/types/property";
import { User } from "@/types/user";
import { Button } from "@mantine/core";
import { IconLego } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

type Props = {
  params: {
    id: string;
    locale: string;
  };
};

export default function UserDetailsPropertiesPage(props: Props) {
  const { t, user, isLoading, isError } = useUserDetailsPropertiesPage(props);

  if (isError) {
    return <PageError message={t("error")} />;
  }

  return (
    <UserPropertiesWrapper
      properties={user?.properties as Property[]}
      user={user as User}
      isLoading={isLoading}
      actionButton={
        <Button
          component={Link}
          href={paths.user(user?.id!)}
          leftIcon={<IconLego size={20} />}
        >
          {t("properties.profileAction")}
        </Button>
      }
    />
  );
}

function useUserDetailsPropertiesPage({ params: { id } }: Props) {
  const t = useTranslations("user");

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: userQuery.key(id),
    queryFn: () => userQuery.fnc(id),
  });

  return { t, user, isLoading, isError };
}
