"use client";

import { Typography } from "@/app/_components/base/typography";
import { NoUserError } from "@/app/_components/users/no-user-error";
import { ProfileCard } from "@/app/_components/users/profile-card";
import { userQuery } from "@/domain/queries/user-query";
import { User } from "@/types/user";
import { Loader, Stack } from "@mantine/core";
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
    <Stack mt="md">
      <ProfileCard user={user} />
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
