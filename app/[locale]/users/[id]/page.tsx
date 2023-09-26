"use client";

import { Link } from "@/app/_components/base/link";
import { Typography } from "@/app/_components/base/typography";
import { PropertyWrapper } from "@/app/_components/properties/property-wrapper";
import { NoUserError } from "@/app/_components/users/no-user-error";
import { ProfileCard } from "@/app/_components/users/profile-card";
import { userQuery } from "@/domain/queries/user-query";
import { useSession } from "@/hooks/use-session";
import { paths } from "@/navigation/paths";
import { Property } from "@/types/property";
import { User } from "@/types/user";
import { Box, Button, Group, Loader, Stack } from "@mantine/core";
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
  const { t, user, isLoading, isError, title } = useUserDetailsPage(props);

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
      <Stack m="md">
        <Group mt="sm" position="apart">
          <Typography component="h1">{title}</Typography>
          {user && (
            <Button
              component={Link}
              href={paths.userProperties(user.id)}
              leftIcon={<IconBuilding size={20} />}
            >
              {t("properties.propertiesAction")}
            </Button>
          )}
        </Group>
        <PropertyWrapper
          properties={{
            pagination: null,
            properties: user?.properties.slice(0, 3) as Property[],
          }}
          isLoading={isLoading}
          disablePagination
          emptyTitle={t("properties.empty.title")}
          emptyDescription={t("properties.empty.description")}
        />
      </Stack>
    </Stack>
  );
}

function useUserDetailsPage({ params: { id } }: Props) {
  const t = useTranslations("user");
  const { session } = useSession();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: userQuery.key(id),
    queryFn: () => userQuery.fnc(id),
  });

  const title = user
    ? session?.user?.id === user?.id
      ? t("properties.titleMe")
      : t.rich("properties.title", { name: user?.firstName })
    : "";

  return { t, user, isLoading, isError, title };
}
