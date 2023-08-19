import { useTranslations } from "next-intl";
import { FC } from "react";

export const LoginForm: FC = () => {
  const { t } = useLoginForm();

  return <h1>Login Form</h1>;
};

function useLoginForm() {
  const t = useTranslations("auth.login.form");

  return { t };
}
