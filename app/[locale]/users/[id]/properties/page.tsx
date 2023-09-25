"use client";

import { Link } from "@/app/_components/base/link";
import { Typography } from "@/app/_components/base/typography";
import { PropertyWrapper } from "@/app/_components/properties/property-wrapper";
import { userQuery } from "@/domain/queries/user-query";
import { useSession } from "@/hooks/use-session";
import { paths } from "@/navigation/paths";
import { Property } from "@/types/property";
import { User } from "@/types/user";
import { Button, Group, Stack, useMantineTheme } from "@mantine/core";
import { IconLego, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

type Props = {
  params: {
    id: string;
    locale: string;
  };
};

export default function UserDetailsPropertiesPage(props: Props) {
  const { t, theme, user, isLoading, isError, title } =
    useUserDetailsPropertiesPage(props);

  if (isError) {
    return (
      <Stack h="100%" align="center" justify="center">
        <IconX size={72} color={theme.colors.red[8]} />
        <Typography component="h2">{t("error")}</Typography>
      </Stack>
    );
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
  const theme = useMantineTheme();
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

  return { t, theme, user, isLoading, isError, title };
}
