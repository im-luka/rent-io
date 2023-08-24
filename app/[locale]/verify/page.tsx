"use client";

import { Typography } from "@/app/_components/base/typography";
import { verifyEmailMutation } from "@/domain/mutations/verify-email-mutation";
import { useIntl } from "@/hooks/use-intl";
import { paths } from "@/navigation/paths";
import { NOTIFICATION_Z_INDEX } from "@/utils/constants";
import { Box, Loader, createStyles } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { IconChecks, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: {
    locale: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default function VerifyPage(props: Props) {
  if (!props.searchParams.token) {
    notFound();
  }

  const { t, classes, theme, seconds, isSuccess, isError } =
    useVerifyPage(props);

  if (isSuccess) {
    return (
      <Box className={classes.wrapper}>
        <IconChecks size={72} color={theme.colors.indigo[5]} />
        <Typography component="h2">{t("success.title")}</Typography>
        <Typography component="h4" fw={400}>
          {t.rich("success.description", {
            count: seconds > 0 ? seconds : 0,
          })}
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className={classes.wrapper}>
        <IconX size={72} color={theme.colors.red[8]} />
        <Typography component="h2">{t("error.title")}</Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.wrapper}>
      <Loader size="lg" />
      <Typography component="h2">{t("loading.title")}</Typography>
    </Box>
  );
}

function useVerifyPage({ searchParams: { token } }: Props) {
  const t = useTranslations("verify");
  const { classes, theme } = useStyles();
  const { router } = useIntl();
  const [seconds, setSeconds] = useState(3);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);

  const {
    mutate: verifyEmail,
    isSuccess,
    isError,
  } = useMutation(verifyEmailMutation.fnc, {
    onSuccess: () => {
      interval.start();
      setTimeout(() => {
        router.replace(paths.login());
        interval.stop();
      }, 3000);
    },
  });

  useEffect(() => {
    verifyEmail(token!);
  }, [token, verifyEmail]);

  return { t, classes, theme, seconds, isSuccess, isError };
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: NOTIFICATION_Z_INDEX - 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md,
    backgroundColor: "inherit",
  },
}));
