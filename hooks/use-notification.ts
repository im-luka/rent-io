import { createElement } from "react";
import { SignInResponse } from "next-auth/react";
import { useTranslations } from "next-intl";
import { AxiosResponse } from "axios";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export const useNotification = <T>() => {
  const t = useTranslations("notifications");

  const onSuccess =
    (
      _data?: AxiosResponse<T> | SignInResponse | undefined,
      _variables?: T,
      _context?: unknown
    ) =>
    (key: string) =>
      notifications.show({
        message: t(`${key}.message`),
        title: t(`${key}.title`),
        color: "green",
        icon: createElement(IconCheck),
        withBorder: true,
      });

  return { onSuccess };
};
