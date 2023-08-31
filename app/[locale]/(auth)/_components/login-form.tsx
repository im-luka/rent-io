"use client";

import { EmailAutocomplete } from "@/app/_components/email-autocomplete";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Stack } from "@mantine/core";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { AuthForm } from "./form";
import { FormPasswordInput } from "@/app/_components/base/form/password-input";
import { SocialsAuth } from "./socials-auth";
import { Typography } from "@/app/_components/base/typography";
import { Link } from "@/app/_components/base/link";
import { paths } from "@/navigation/paths";

type Props = {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  isLoading?: boolean;
};

export const LoginForm: FC<Props> = (props) => {
  const { t, loginForm, isLoading, onSubmit } = useLoginForm(props);

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
            <Typography size="xs" ta="center">
              {t.rich("goRegisterAction", {
                s: (chunk) => (
                  <Link href={paths.register()} color="blue.5">
                    {chunk}
                  </Link>
                ),
              })}
            </Typography>
            <Divider />
            <SocialsAuth />
          </Stack>
        </Stack>
      </AuthForm>
    </FormProvider>
  );
};

function useLoginForm({ onSubmit, isLoading }: Props) {
  const t = useTranslations("auth.login.form");

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
