"use client";

import { Typography } from "@/app/_components/base/typography";
import { useTranslations } from "next-intl";
import { LoginForm, LoginFormValues } from "../_components/login-form";
import { FormContainer } from "../_components/form-container";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/hooks/use-notification";
import { credentialsLoginMutation } from "@/domain/mutations/credentials-login-mutation";
import { useIntl } from "@/hooks/use-intl";
import { paths } from "@/navigation/paths";

export default function LoginPage() {
  const { t, isSigning, handleSubmit } = useLoginPage();

  return (
    <FormContainer>
      <Typography component="h2" align="center">
        {t.rich("title", {
          s: (chunk) => (
            <Typography component="span" color="indigo.5" italic>
              {chunk}
            </Typography>
          ),
        })}
      </Typography>
      <LoginForm onSubmit={handleSubmit} isLoading={isSigning} />
    </FormContainer>
  );
}

function useLoginPage() {
  const t = useTranslations("auth.login");
  const { onSuccess } = useNotification("login");
  const { router } = useIntl();

  const { mutateAsync: signIn, isLoading: isSigning } = useMutation({
    mutationFn: credentialsLoginMutation.fnc,
    onSuccess: () => {
      onSuccess();
      router.replace(paths.home());
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    await signIn(values);
  };

  return { t, isSigning, handleSubmit };
}
