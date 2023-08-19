import { notifications } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { useTranslations } from "next-intl";
import { IconCheck } from "@tabler/icons-react";
import { createElement } from "react";

export const useNotification = <T>(key: string) => {
  const t = useTranslations("notifications");

  const onSuccess = (
    _data: AxiosResponse<T>,
    _variables: T,
    _context: unknown
  ) =>
    notifications.show({
      message: t(`${key}.message`),
      title: t(`${key}.title`),
      color: "green",
      icon: createElement(IconCheck),
      withBorder: true,
    });

  return { onSuccess };
};
