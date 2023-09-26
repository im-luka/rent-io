import { FC, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Group, Stack } from "@mantine/core";
import { useSession } from "@/hooks/use-session";
import { Property } from "@/types/property";
import { User } from "@/types/user";
import { Typography } from "../base/typography";
import { PropertyWrapper } from "../properties/property-wrapper";

type Props = {
  properties: Property[];
  user: User;
  isLoading: boolean;
  actionButton?: ReactNode;
};

export const UserPropertiesWrapper: FC<Props> = (props) => {
  const { t, properties, user, isLoading, actionButton, title } =
    useUserPropertiesWrapper(props);

  return (
    <Stack m="md">
      <Group mt="sm" position="apart">
        <Typography component="h1">{title}</Typography>
        {user && actionButton}
      </Group>
      <PropertyWrapper
        properties={{
          pagination: null,
          properties: properties,
        }}
        isLoading={isLoading}
        disablePagination
        emptyTitle={t("empty.title")}
        emptyDescription={t("empty.description")}
      />
    </Stack>
  );
};

function useUserPropertiesWrapper({
  properties,
  user,
  isLoading,
  actionButton,
}: Props) {
  const t = useTranslations("user.properties");
  const { session } = useSession();

  const title = user
    ? session?.user?.id === user?.id
      ? t("titleMe")
      : t.rich("title", { name: user?.firstName })
    : "";

  return { t, properties, user, isLoading, actionButton, title };
}
