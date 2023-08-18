import { api } from "../remote";
import { RegisterData } from "../types/register-data";

export const registerMutation = {
  fnc: (data: RegisterData) => api.post<RegisterData>("register", data),
};
