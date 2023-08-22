"use client";

import { FC } from "react";
import { Typography } from "@/app/_components/base/typography";
import { Button, Divider, Group, Stack } from "@mantine/core";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormTextInput } from "@/app/_components/base/form/text-input";
import { EmailAutocomplete } from "@/app/_components/email-autocomplete";
import { PasswordProgress } from "@/app/_components/password-progress";
import { FormPasswordInput } from "@/app/_components/base/form/password-input";
import { MIN_PASSWORD_CHARS } from "@/utils/constants";
import { AuthForm } from "./form";
import { SocialsAuth } from "./socials-auth";

type Props = {
  onSubmit: (values: RegisterFormValues) => void;
  isLoading?: boolean;
};

export const RegisterForm: FC<Props> = (props) => {
  const {
    t,
    isLoading,
    registerForm,
    namesErrors,
    passwordValidationChecks,
    onSubmit,
  } = useRegisterForm(props);

  return (
    <FormProvider {...registerForm}>
      <AuthForm onSubmit={onSubmit}>
        <Stack spacing="sm">
          <Stack spacing="xs">
            <EmailAutocomplete
              name="email"
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              withAsterisk
            />
            <Group noWrap>
              <FormTextInput
                name="firstName"
                label={t("firstName")}
                placeholder={t("firstNamePlaceholder")}
                withAsterisk
                w="100%"
                mb={namesErrors.firstName ? "md" : 0}
              />
              <FormTextInput
                name="lastName"
                label={t("lastName")}
                placeholder={t("lastNamePlaceholder")}
                withAsterisk
                w="100%"
                mb={namesErrors.lastName ? "md" : 0}
              />
            </Group>
            <PasswordProgress
              name="password"
              validationChecks={passwordValidationChecks}
              label={t("password")}
              placeholder={t("password")}
              withAsterisk
            />
            {!registerForm.formState.errors.password &&
              registerForm.formState.dirtyFields.password && (
                <FormPasswordInput
                  name="confirmPassword"
                  label={t("confirmPassword")}
                  placeholder={t("confirmPassword")}
                  withAsterisk
                />
              )}
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
            <Button type="submit" variant="gradient" loading={isLoading}>
              {t("registerAction")}
            </Button>
            <Divider />
            <SocialsAuth />
          </Stack>
        </Stack>
      </AuthForm>
    </FormProvider>
  );
};

function useRegisterForm({ onSubmit, isLoading }: Props) {
  const t = useTranslations("auth.register.form");

  const tValidation = useTranslations("validation");
  const validationMessages: Parameters<typeof registerSchema> = [
    tValidation("required"),
    tValidation("invalidEmail"),
    tValidation("minChars", { count: MIN_PASSWORD_CHARS }),
    tValidation("includesNumber"),
    tValidation("includesLowercase"),
    tValidation("includesUppercase"),
    tValidation("includesSymbol"),
    tValidation("passwordMatch"),
  ];
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema(...validationMessages)),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });
  const {
    formState: { errors },
    handleSubmit,
  } = registerForm;
  const namesErrors = {
    firstName: !!(!errors.firstName && errors.lastName),
    lastName: !!(!errors.lastName && errors.firstName),
  };
  const passwordValidationChecks = registerSchema(...validationMessages)._def
    .schema.shape.password._def.checks;

  return {
    t,
    isLoading,
    registerForm,
    namesErrors,
    passwordValidationChecks,
    onSubmit: handleSubmit(onSubmit),
  };
}

// TODO: 💡 potential improvement - figure better way of combining zod & next-intl
export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
const registerSchema = (
  required: string,
  invalidEmail: string,
  minPswChars: string,
  pswNumber: string,
  pswLowercase: string,
  pswUppercase: string,
  pswSymbol: string,
  pswMatch: string
) =>
  z
    .object({
      email: z.string().email(invalidEmail),
      firstName: z.string().nonempty(required),
      lastName: z.string().nonempty(required),
      password: z
        .string()
        .nonempty(required)
        .min(MIN_PASSWORD_CHARS, minPswChars)
        .regex(RegExp("(?=.*[a-z])"), pswLowercase)
        .regex(RegExp("(?=.*[A-Z])"), pswUppercase)
        .regex(RegExp("(?=.*\\d)"), pswNumber)
        .regex(RegExp("(?=.*\\W)"), pswSymbol),
      confirmPassword: z.string(),
    })
    .refine(({ confirmPassword, password }) => password === confirmPassword, {
      message: pswMatch,
      path: ["confirmPassword"],
    });
