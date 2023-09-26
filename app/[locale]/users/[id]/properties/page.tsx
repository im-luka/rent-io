"use client";

import { Link } from "@/app/_components/base/link";
import { Typography } from "@/app/_components/base/typography";
import { PropertyWrapper } from "@/app/_components/properties/property-wrapper";
import { NoUserError } from "@/app/_components/users/no-user-error";
import { userQuery } from "@/domain/queries/user-query";
import { useSession } from "@/hooks/use-session";
import { paths } from "@/navigation/paths";
import { Property } from "@/types/property";
import { User } from "@/types/user";
import { Button, Group, Stack } from "@mantine/core";
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
  const { t, user, isLoading, isError, title } =
    useUserDetailsPropertiesPage(props);

  if (isError) {
    return <NoUserError />;
  }

  return (
    <Stack m="md">
      <Group mt="sm" position="apart">
        <Typography component="h1">{title}</Typography>
        {user && (
          <Button
            component={Link}
            href={paths.user(user.id)}
            leftIcon={<IconLego size={20} />}
          >
            {t("profileAction")}
          </Button>
        )}
      </Group>
      <PropertyWrapper
        properties={{
          pagination: null,
          properties: (user?.properties ?? []) as Property[],
        }}
        isLoading={isLoading}
        disablePagination
        emptyTitle={t("empty.title")}
        emptyDescription={t("empty.description")}
      />
    </Stack>
  );
}

function useUserDetailsPropertiesPage({ params: { id } }: Props) {
  const t = useTranslations("userProperties");
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
      ? t("titleMe")
      : t.rich("title", { name: user?.firstName })
    : "";

  return { t, user, isLoading, isError, title };
}
