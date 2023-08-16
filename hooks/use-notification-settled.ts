import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { AxiosResponse, isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { createElement } from "react";

export const useNotificationSettled = <T>(key: string) => {
  const t = useTranslations("notifications");

  const notify = (
    _data: AxiosResponse<T> | undefined,
    error: unknown,
    _variables: T,
    _context: unknown
  ) => {
    let title;
    let message;
    if (error) {
      const errorKnown = isAxiosError(error) || error instanceof Error;
      title = errorKnown ? error.name : t("error.title");
      message = errorKnown ? error.message : t("error.message");
    } else {
      title = t(`${key}.title`);
      message = t(`${key}.message`);
    }

    const icon = createElement(error ? IconX : IconCheck);

    notifications.show({
      message,
      title,
      color: error ? "red" : "green",
      icon,
      autoClose: 5000,
      withBorder: true,
    });
  };

  return { notify };
};
