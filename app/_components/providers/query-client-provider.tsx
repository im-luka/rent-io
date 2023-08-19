"use client";

import { FC, ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider as QCProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { api } from "@/domain/remote";
import { getData } from "@/domain/remote/response/data";
import { useTranslations } from "next-intl";
import { isAxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

type Props = {
  children: ReactNode;
};

export const QueryClientProvider: FC<Props> = ({ children }) => {
  const { queryClient } = useQueryClientProvider();

  return (
    <QCProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QCProvider>
  );
};

function useQueryClientProvider() {
  const t = useTranslations("notifications");
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: async ({ queryKey }) => {
              const [path, params] = queryKey as [string, unknown];
              return getData(await api.get(path, { params }));
            },
          },
          mutations: {
            onError: (error) => {
              const errorKnown = isAxiosError(error) || error instanceof Error;
              const title = errorKnown ? error.name : t("error.title");
              const message = errorKnown ? error.message : t("error.message");
              notifications.show({
                message,
                title,
                color: "red",
                icon: <IconX />,
                withBorder: true,
              });
            },
          },
        },
      })
  );

  return { queryClient };
}
