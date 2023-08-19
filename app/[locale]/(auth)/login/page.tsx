"use client";

import { Typography } from "@/app/_components/base/typography";
import { useTranslations } from "next-intl";
import { LoginForm } from "../_components/login-form";
import { FormContainer } from "../_components/form-container";

export default function LoginPage() {
  const { t } = useLoginPage();

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
      <LoginForm />
    </FormContainer>
  );
}

function useLoginPage() {
  const t = useTranslations("auth.login");

  return { t };
}
