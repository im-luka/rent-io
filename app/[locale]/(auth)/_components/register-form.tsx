"use client";

import { FC } from "react";
import { Typography } from "@/app/_components/mantine/typography";
import { Button, Divider, Group, Stack, createStyles } from "@mantine/core";
import { useTranslations } from "next-intl";
import { GithubIcon } from "@mantine/ds";
import { GoogleIcon } from "@/app/_components/icons/google-icon";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormTextInput } from "@/app/_components/mantine/form/text-input";
import { FormPasswordInput } from "@/app/_components/mantine/form/password-input";

export const RegisterForm: FC = () => {
  const { t, classes, registerForm, namesErrors, onSubmit } = useRegisterForm();

  return (
    <FormProvider {...registerForm}>
      <form onSubmit={onSubmit}>
        <Stack>
          <Stack spacing="xs">
            <FormTextInput
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
                mb={namesErrors.firstName ? "md" : 0}
              />
              <FormTextInput
                name="lastName"
                label={t("lastName")}
                placeholder={t("lastNamePlaceholder")}
                withAsterisk
                mb={namesErrors.lastName ? "md" : 0}
              />
            </Group>
            <FormPasswordInput
              name="password"
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
            <Button type="submit" variant="gradient">
              {t("registerAction")}
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
      </form>
    </FormProvider>
  );
};

function useRegisterForm() {
  const t = useTranslations("auth.register.form");
  const [{ isDarkTheme }] = useColorScheme();
  const { classes } = useStyles(isDarkTheme);

  const tValidation = useTranslations("validation");
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema(tValidation("required"))),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });
  const {
    formState: { errors },
    handleSubmit,
  } = registerForm;
  const namesErrors = {
    firstName: !!(!errors.firstName && errors.lastName),
    lastName: !!(!errors.lastName && errors.firstName),
  };

  const onSubmit = (values: RegisterFormValues) => {
    console.log(values);
  };

  return {
    t,
    classes,
    registerForm,
    namesErrors,
    onSubmit: handleSubmit(onSubmit),
  };
}

type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
const registerSchema = (required: string) =>
  z.object({
    email: z.string().email(),
    firstName: z.string().nonempty(required),
    lastName: z.string().nonempty(required),
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
