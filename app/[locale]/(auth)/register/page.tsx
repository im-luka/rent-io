"use client";

import { Typography } from "@/app/_components/base/typography";
import { useTranslations } from "next-intl";
import { RegisterForm, RegisterFormValues } from "../_components/register-form";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/hooks/use-notification";
import { registerMutation } from "@/domain/mutations/register-mutation";
import { RegisterSuccess } from "../_components/register-success";
import { FormContainer } from "../_components/form-container";

export default function RegisterPage() {
  const { t, isRegistering, isRegistrationSuccess, handleRegistration } =
    useRegisterPage();

  return (
    <FormContainer>
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
    </FormContainer>
  );
}

function useRegisterPage() {
  const t = useTranslations("auth.register");
  const { onSuccess } = useNotification();

  const {
    mutate: register,
    isLoading: isRegistering,
    isSuccess: isRegistrationSuccess,
  } = useMutation({
    mutationFn: registerMutation.fnc,
    onSuccess: () => onSuccess()("register"),
  });

  const handleRegistration = (values: RegisterFormValues) => {
    const { confirmPassword, ...data } = values;
    register(data);
  };

  return {
    t,
    isRegistering,
    isRegistrationSuccess,
    handleRegistration,
  };
}
