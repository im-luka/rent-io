"use client";

import { Typography } from "@/app/_components/base/typography";
import { Stack, useMantineTheme } from "@mantine/core";
import { useTranslations } from "next-intl";
import { RegisterForm, RegisterFormValues } from "../_components/register-form";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useMutation } from "@tanstack/react-query";
import { useNotificationSettled } from "@/hooks/use-notification-settled";
import { registerMutation } from "@/domain/mutations/register-mutation";
import { RegisterSuccess } from "../_components/register-success";

export default function RegisterPage() {
  const {
    t,
    theme,
    isDarkTheme,
    isRegistering,
    isRegistrationSuccess,
    handleRegistration,
  } = useRegisterPage();

  return (
    <Stack
      align="center"
      px="sm"
      py="xl"
      m="xs"
      bg={isDarkTheme ? theme.colors.dark[6] : theme.colors.gray[0]}
      sx={{ borderRadius: theme.radius.md }}
    >
      {isRegistrationSuccess ? (
        <RegisterSuccess />
      ) : (
        <>
          <Typography component="h2" align="center">
            {t.rich("title", {
              s: (chunk) => (
                <Typography component="span" color="indigo.5" italic>
                  {chunk}
                </Typography>
              ),
            })}
          </Typography>
          <RegisterForm
            onSubmit={handleRegistration}
            isLoading={isRegistering}
          />
        </>
      )}
    </Stack>
  );
}

function useRegisterPage() {
  const t = useTranslations("auth.register");
  const theme = useMantineTheme();
  const [{ isDarkTheme }] = useColorScheme();
  const { notify } = useNotificationSettled("register");

  const {
    mutate: register,
    isLoading: isRegistering,
    isSuccess: isRegistrationSuccess,
  } = useMutation({
    mutationFn: registerMutation.fnc,
    onSettled: notify,
  });

  const handleRegistration = (values: RegisterFormValues) => {
    const { confirmPassword, ...data } = values;
    register(data);
  };

  return {
    t,
    theme,
    isDarkTheme,
    isRegistering,
    isRegistrationSuccess,
    handleRegistration,
  };
}
