import { RegisterFormValues } from "@/app/[locale]/(auth)/_components/register-form";

export type RegisterData = Omit<RegisterFormValues, "confirmPassword">;
