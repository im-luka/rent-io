"use client";

import { Typography } from "@/app/_components/base/typography";
import { Stack, useMantineTheme } from "@mantine/core";
import { useTranslations } from "next-intl";
import { RegisterForm } from "../_components/register-form";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RegisterPage() {
  const { t, theme, isDarkTheme } = useRegisterPage();

  return (
    <Stack
      align="center"
      px="sm"
      py="xl"
      bg={isDarkTheme ? theme.colors.dark[6] : theme.colors.gray[0]}
      sx={{ borderRadius: theme.radius.md }}
    >
      <Typography component="h2" align="center">
        {t.rich("title", {
          s: (chunk) => (
            <Typography component="span" color="indigo.5" italic>
              {chunk}
            </Typography>
          ),
        })}
      </Typography>
      <RegisterForm />
    </Stack>
  );
}

function useRegisterPage() {
  const t = useTranslations("auth.register");
  const theme = useMantineTheme();
  const [{ isDarkTheme }] = useColorScheme();

  return { t, theme, isDarkTheme };
}
