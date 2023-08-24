import { api } from "../remote";

export const verifyEmailMutation = {
  fnc: (token: string) => api.post("verify", JSON.stringify(token)),
};
