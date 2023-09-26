"use client";

import { FC } from "react";
import { GoogleIcon } from "@/app/_components/icons/google-icon";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Button, Stack, createStyles } from "@mantine/core";
import { GithubIcon } from "@mantine/ds";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { IconBrandReddit } from "@tabler/icons-react";

export const SocialsAuth: FC = () => {
  const { t, classes } = useSocialsAuth();

  return (
    <Stack spacing="xs">
      <Button
        size="xs"
        variant="default"
        color="gray.2"
        leftIcon={<GoogleIcon />}
        onClick={() => signIn("google")}
      >
        {t("googleAction")}
      </Button>
      <Button
        size="xs"
        variant="filled"
        leftIcon={<GithubIcon size={16} />}
        className={classes.githubBtn}
        onClick={() => signIn("github")}
      >
        {t("githubAction")}
      </Button>
      <Button
        size="xs"
        variant="filled"
        leftIcon={<IconBrandReddit size={16} />}
        className={classes.redditBtn}
        onClick={() => signIn("reddit")}
      >
        {t("redditAction")}
      </Button>
    </Stack>
  );
};

function useSocialsAuth() {
  const t = useTranslations("auth.socials");
  const [{ isDarkTheme }] = useColorScheme();
  const { classes } = useStyles(isDarkTheme);

  return { t, classes };
}

const useStyles = createStyles((theme, isDarkTheme: boolean) => ({
  githubBtn: {
    backgroundColor: theme.colors.dark[isDarkTheme ? 9 : 5],
    color: theme.white,
    ":hover": {
      backgroundColor: theme.colors.dark[isDarkTheme ? 8 : 6],
    },
  },
  redditBtn: {
    backgroundColor: "#FE4500",
    ":hover": {
      backgroundColor: "#FE4500DD",
    },
  },
}));
