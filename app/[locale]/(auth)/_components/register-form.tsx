"use client";

import { Typography } from "@/app/_components/mantine/typography";
import {
  Button,
  Divider,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  createStyles,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { GithubIcon } from "@mantine/ds";
import { GoogleIcon } from "@/app/_components/icons/google-icon";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const RegisterForm: FC = () => {
  const { t, classes } = useRegisterForm();

  return (
    <form>
      <Stack>
        <Stack spacing="xs">
          <TextInput
            label={t("email")}
            placeholder={t("emailPlaceholder")}
            withAsterisk
          />
          <Group>
            <TextInput
              label={t("firstName")}
              placeholder={t("firstNamePlaceholder")}
              withAsterisk
            />
            <TextInput
              label={t("lastName")}
              placeholder={t("lastNamePlaceholder")}
              withAsterisk
            />
          </Group>
          <PasswordInput
            label={t("password")}
            placeholder={t("password")}
            withAsterisk
          />
        </Stack>
        <Stack mt="md">
          <Typography size="xs" fw="400" align="center">
            {t.rich("agreeTerms", {
              s: (chunks) => (
                <Typography component="span" color="blue.5">
                  {chunks}
                </Typography>
              ),
            })}
          </Typography>
          <Button variant="gradient">{t("registerAction")}</Button>
          <Divider />
          <Stack spacing="xs">
            <Button
              size="xs"
              variant="default"
              color="gray.2"
              leftIcon={<GoogleIcon />}
            >
              {t("googleAction")}
            </Button>
            <Button
              size="xs"
              variant="filled"
              leftIcon={<GithubIcon size={16} />}
              className={classes.githubBtn}
            >
              {t("githubAction")}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};

function useRegisterForm() {
  const t = useTranslations("auth.register.form");
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
}));
