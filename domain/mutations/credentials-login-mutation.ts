import { signIn } from "next-auth/react";
import { LoginData } from "../types/login-data";

export const credentialsLoginMutation = {
  fnc: async (data: LoginData) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    const error = response?.error;
    if (error) {
      throw new Error(error);
    }

    return response;
  },
};
