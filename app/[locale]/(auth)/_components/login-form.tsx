"use client";

import { EmailAutocomplete } from "@/app/_components/email-autocomplete";
import { GoogleIcon } from "@/app/_components/icons/google-icon";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Stack, createStyles } from "@mantine/core";
import { GithubIcon } from "@mantine/ds";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { AuthForm } from "./form";
import { FormPasswordInput } from "@/app/_components/base/form/password-input";

type Props = {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  isLoading?: boolean;
};

export const LoginForm: FC<Props> = (props) => {
  const { t, classes, loginForm, isLoading, onSubmit } = useLoginForm(props);

  return (
    <FormProvider {...loginForm}>
      <AuthForm onSubmit={onSubmit}>
        <Stack spacing="sm" w="100%">
          <Stack spacing="xs">
            <EmailAutocomplete
              name="email"
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              withAsterisk
            />
            <FormPasswordInput
              name="password"
              label={t("password")}
              placeholder={t("password")}
              withAsterisk
            />
          </Stack>
          <Stack mt="md">
            <Button type="submit" variant="gradient" loading={isLoading}>
              {t("loginAction")}
            </Button>
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
      </AuthForm>
    </FormProvider>
  );
};

function useLoginForm({ onSubmit, isLoading }: Props) {
  const t = useTranslations("auth.login.form");
  const [{ isDarkTheme }] = useColorScheme();
  const { classes } = useStyles(isDarkTheme);

  const tValidation = useTranslations("validation");
  const validationMessages: Parameters<typeof loginSchema> = [
    tValidation("required"),
    tValidation("invalidEmail"),
  ];
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(...validationMessages)),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });
  const { handleSubmit } = loginForm;

  return {
    t,
    classes,
    loginForm,
    isLoading,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
const loginSchema = (required: string, invalidEmail: string) =>
  z.object({
    email: z.string().email(invalidEmail),
    password: z.string().nonempty(required),
  });

const useStyles = createStyles((theme, isDarkTheme: boolean) => ({
  githubBtn: {
    backgroundColor: theme.colors.dark[isDarkTheme ? 9 : 5],
    color: theme.white,
    ":hover": {
      backgroundColor: theme.colors.dark[isDarkTheme ? 8 : 6],
    },
  },
}));
