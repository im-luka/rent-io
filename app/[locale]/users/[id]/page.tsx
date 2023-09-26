"use client";

import { Link } from "@/app/_components/base/link";
import { PageLoading } from "@/app/_components/page-loading";
import { PageError } from "@/app/_components/page-error";
import { ProfileCard } from "@/app/_components/users/profile-card";
import { UserPropertiesWrapper } from "@/app/_components/users/user-properties-wrapper";
import { userQuery } from "@/domain/queries/user-query";
import { paths } from "@/navigation/paths";
import { Property } from "@/types/property";
import { User } from "@/types/user";
import { Button, Stack } from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

type Props = {
  params: {
    id: string;
    locale: string;
  };
};

export default function UserDetailsPage(props: Props) {
  const { t, user, isLoading, isError } = useUserDetailsPage(props);

  if (isError) {
    return <PageError message={t("error")} />;
  }

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Stack mt="lg" spacing="xl">
      <ProfileCard user={user} />
      <UserPropertiesWrapper
        properties={user?.properties.slice(0, 3) as Property[]}
        user={user as User}
        isLoading={isLoading}
        actionButton={
          <Button
            component={Link}
            href={paths.userProperties(user?.id!)}
            leftIcon={<IconBuilding size={20} />}
          >
            {t("properties.propertiesAction")}
          </Button>
        }
      />
    </Stack>
  );
}

function useUserDetailsPage({ params: { id } }: Props) {
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
