"use client";

import { Link } from "@/app/_components/base/link";
import { Typography } from "@/app/_components/base/typography";
import { NoUserError } from "@/app/_components/users/no-user-error";
import { ProfileCard } from "@/app/_components/users/profile-card";
import { UserPropertiesWrapper } from "@/app/_components/users/user-properties-wrapper";
import { userQuery } from "@/domain/queries/user-query";
import { paths } from "@/navigation/paths";
import { Property } from "@/types/property";
import { User } from "@/types/user";
import { Button, Loader, Stack } from "@mantine/core";
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
    return <NoUserError />;
  }

  if (isLoading) {
    return (
      <Stack h="100%" justify="center" align="center" spacing="sm">
        <Loader size="lg" />
        <Typography size="lg" lts={1} fw={600}>
          {t("loading")}
        </Typography>
      </Stack>
    );
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
